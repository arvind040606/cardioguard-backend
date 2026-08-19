-- ==============================================================================
-- 07_NOTIFICATIONS_TRIGGER.SQL
-- Automatic server-side notification creation trigger for predictions
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_prediction_notification()
RETURNS TRIGGER AS $$
DECLARE
    notif_title TEXT;
    notif_msg TEXT;
BEGIN
    IF NEW.risk_level = 'High' THEN
        notif_title := 'High-risk assessment detected';
        notif_msg := 'Your latest assessment for ' || NEW.patient_name || ' (' || NEW.patient_id || ') indicates a high cardiovascular risk level (' || (NEW.risk_probability * 100)::numeric(5,1) || '%). Please review the assessment results.';
    ELSE
        notif_title := 'Risk analysis completed';
        notif_msg := 'Your cardiovascular risk assessment for ' || NEW.patient_name || ' (' || NEW.patient_id || ') has been generated successfully.';
    END IF;

    INSERT INTO public.notifications (user_id, title, message, read, action_url)
    VALUES (NEW.user_id, notif_title, notif_msg, FALSE, '/dashboard/history');

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE LOG 'Error in prediction notification trigger: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trigger_on_prediction_created ON predictions;
CREATE TRIGGER trigger_on_prediction_created
AFTER INSERT ON predictions
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_prediction_notification();
