from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

app = FastAPI()

class UserProfile(BaseModel):
    user_id: str
    full_name: str
    email: str
    bio: Optional[str] = None
    skills: List[str] = []
    portfolio_items: List[dict] = []
    created_at: datetime
    updated_at: datetime

# In-memory storage for demonstration
user_profiles = {}

@app.post("/profiles/", response_model=UserProfile)
async def create_profile(profile: UserProfile):
    if profile.user_id in user_profiles:
        raise HTTPException(status_code=400, detail="Profile already exists")
    user_profiles[profile.user_id] = profile
    return profile

@app.get("/profiles/{user_id}", response_model=UserProfile)
async def get_profile(user_id: str):
    if user_id not in user_profiles:
        raise HTTPException(status_code=404, detail="Profile not found")
    return user_profiles[user_id]

@app.put("/profiles/{user_id}", response_model=UserProfile)
async def update_profile(user_id: str, profile: UserProfile):
    if user_id not in user_profiles:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile.updated_at = datetime.utcnow()
    user_profiles[user_id] = profile
    return profile

@app.delete("/profiles/{user_id}")
async def delete_profile(user_id: str):
    if user_id not in user_profiles:
        raise HTTPException(status_code=404, detail="Profile not found")
    del user_profiles[user_id]
    return {"message": "Profile deleted"}
