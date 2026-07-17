use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FocusBoardData {
    pub title: String,
    pub subtitle: String,
    pub goals: Vec<Goal>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Goal {
    pub id: String,
    pub text: String,
    pub completed: bool,
    pub order: u32,
}

impl Default for FocusBoardData {
    fn default() -> Self {
        Self {
            title: "MVP by Monday".to_string(),
            subtitle: "Cold Calling App".to_string(),
            goals: vec![
                Goal {
                    id: "goal-1".to_string(),
                    text: "Finalize user flow".to_string(),
                    completed: true,
                    order: 0,
                },
                Goal {
                    id: "goal-2".to_string(),
                    text: "Replace mock data".to_string(),
                    completed: false,
                    order: 1,
                },
                Goal {
                    id: "goal-3".to_string(),
                    text: "Save and update leads".to_string(),
                    completed: false,
                    order: 2,
                },
                Goal {
                    id: "goal-4".to_string(),
                    text: "Test calling workflow".to_string(),
                    completed: false,
                    order: 3,
                },
                Goal {
                    id: "goal-5".to_string(),
                    text: "Polish UI".to_string(),
                    completed: false,
                    order: 4,
                },
                Goal {
                    id: "goal-6".to_string(),
                    text: "First cold calling session".to_string(),
                    completed: true,
                    order: 5,
                },
            ],
        }
    }
}
