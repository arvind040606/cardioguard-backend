function generateRecommendations(input, probability, riskLevel) {
  const recommendations = [];

  if (input.chol >= 240) {
    recommendations.push(
      `Dietary Warning: High Cholesterol level (${input.chol} mg/dL). Reduce saturated and trans fats intake. Eat more fiber (oats, beans) and omega-3 fatty acids (fish). Consult a clinical dietitian.`
    );
  } else if (input.chol >= 200) {
    recommendations.push(
      `Dietary Advisory: Borderline Cholesterol level (${input.chol} mg/dL). Limit fried foods, red meat, and processed snacks. Incorporate more plant-based foods.`
    );
  }

  if (input.trestbps >= 140) {
    recommendations.push(
      `Hypertension Warning: High Resting Blood Pressure (${input.trestbps} mmHg). Restrict sodium intake to <2,000 mg per day. Engage in regular light aerobic exercise. Consult a cardiologist for potential medication.`
    );
  } else if (input.trestbps >= 120) {
    recommendations.push(
      `Hypertension Advisory: Elevated Blood Pressure (${input.trestbps} mmHg). Reduce alcohol, salt, and caffeine intake. Practice stress management techniques like meditation or deep breathing.`
    );
  }

  if (input.thalach < 100) {
    recommendations.push(
      `Cardiac capacity: Low maximum heart rate (${input.thalach} bpm) during testing. Cardiovascular training like brisk walking, cycling, or swimming is recommended to improve cardiac output. Speak with a doctor first.`
    );
  }

  if (input.exang === 1) {
    recommendations.push(
      'Symptom Warning: Exercise-induced chest pain (angina) detected. Avoid strenuous exertion without medical supervision. Always carry prescribed quick-relief medication if applicable.'
    );
  }

  if (input.fbs === 1) {
    recommendations.push(
      'Metabolic Warning: Elevated fasting blood sugar (> 120 mg/dL), indicative of pre-diabetes or diabetes. Monitor glycemic levels closely. Reduce sugar and refined carbs. Schedule an HbA1c test.'
    );
  }

  if (riskLevel === 'High') {
    recommendations.push(
      'URGENT: High cardiovascular risk score. Schedule a comprehensive cardiology consultation immediately for a stress test, ECG, or echocardiogram.'
    );
  } else if (riskLevel === 'Moderate') {
    recommendations.push(
      'Preventive Action: Moderate risk score. Arrange a clinical review with your primary care physician within 30 days to establish a cardiovascular risk management plan.'
    );
  } else {
    recommendations.push(
      'Wellness Action: Low risk score. Maintain your excellent lifestyle: 150 minutes of moderate exercise per week, a balanced Mediterranean diet, and annual check-ups.'
    );
  }

  return recommendations;
}

module.exports = { generateRecommendations };
