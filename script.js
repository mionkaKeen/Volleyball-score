document.addEventListener('DOMContentLoaded', () => {
  // Set copyright year automatically
  document.getElementById('year').textContent = new Date().getFullYear();

  // Initialize shared Local Storage state if not present
  if (!localStorage.getItem('volleyball_match_state')) {
    const initialState = {
      teamA: { name: 'Home Team', points: 0, setsWon: 0 },
      teamB: { name: 'Away Team', points: 0, setsWon: 0 },
      currentSet: 1,
      isLive: false
    };
    localStorage.setItem('volleyball_match_state', JSON.stringify(initialState));
  }
});