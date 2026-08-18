
const SUPABASE_URL = "https://cesffaiaxrwoomuttlza.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_QOFPHVDAgI2dNr977BREvw_ga_HMzuE";

const sb = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");

let scoreA = 0;
let scoreB = 0;

function updateDisplay() {
    document.getElementById("scoreA").textContent = scoreA;
    document.getElementById("scoreB").textContent = scoreB;
}

async function changeScore(team, amount) {

    if (team === "A") {
        scoreA += amount;
    }

    if (team === "B") {
        scoreB += amount;
    }

    updateDisplay();

    await saveScore();
}

function resetScores() {
    scoreA = 0;
    scoreB = 0;
    updateDisplay();
}
const currentMatchId = 1;

async function loadScore() {

    const { data, error } = await sb
        .from("scores")
        .select("*")
        .eq("match_id", currentMatchId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

    scoreA = data.team_a_score || 0;
    scoreB = data.team_b_score || 0;

    updateDisplay();
}

async function saveScore() {

    const { data, error } = await sb
        .from("scores")
        .update({
            team_a_score: scoreA,
            team_b_score: scoreB
        })
        .eq("match_id", currentMatchId)
        .select();

    console.log("Save data:", data);
    console.log("Save error:", error);
}

window.changeScore = changeScore;
window.resetScores = resetScores;

loadScore();

/*document.addEventListener('DOMContentLoaded', () => {
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
});*/
