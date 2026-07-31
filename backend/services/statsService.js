const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function buildPredictionFilter(user) {
  if (user.role === 'admin') return {};
  return { createdBy: user.id };
}

function computeStats(predictions, userCount) {
  const totalPredictions = predictions.length;
  const highRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'high').length;
  const moderateRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'moderate').length;
  const lowRisk = predictions.filter((p) => p.riskLevel.toLowerCase() === 'low').length;

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const predictionsToday = predictions.filter((p) => new Date(p.createdAt) >= oneDayAgo).length;

  const monthlyPredictions = MONTHS.map((month) => ({ month, predictions: 0 }));
  predictions.forEach((p) => {
    const monthIdx = new Date(p.createdAt).getMonth();
    monthlyPredictions[monthIdx].predictions += 1;
  });

  const ageGroups = { '20-39': 0, '40-49': 0, '50-59': 0, '60-69': 0, '70+': 0 };
  let maleCount = 0;
  let femaleCount = 0;

  predictions.forEach((p) => {
    const age = p.input?.age;
    if (age < 40) ageGroups['20-39'] += 1;
    else if (age < 50) ageGroups['40-49'] += 1;
    else if (age < 60) ageGroups['50-59'] += 1;
    else if (age < 70) ageGroups['60-69'] += 1;
    else ageGroups['70+'] += 1;

    if (p.input?.sex === 1) maleCount += 1;
    else femaleCount += 1;
  });

  return {
    summary: {
      totalPredictions,
      highRiskCount: highRisk,
      moderateRiskCount: moderateRisk,
      lowRiskCount: lowRisk,
      predictionsToday,
      activeDoctors: userCount,
    },
    charts: {
      monthlyPredictions,
      ageDistribution: Object.entries(ageGroups).map(([group, count]) => ({ group, count })),
      genderDistribution: [
        { gender: 'Male', count: maleCount },
        { gender: 'Female', count: femaleCount },
      ],
      riskDistribution: [
        { risk: 'Low', count: lowRisk },
        { risk: 'Moderate', count: moderateRisk },
        { risk: 'High', count: highRisk },
      ],
    },
    hasData: totalPredictions > 0,
  };
}

module.exports = { buildPredictionFilter, computeStats };
