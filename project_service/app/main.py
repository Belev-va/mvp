from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

app = FastAPI()

class ProjectStatus(str, Enum):
    DRAFT = "draft"
    ACTIVE = "active"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class ProjectRole(BaseModel):
    user_id: str
    role: str
    permissions: List[str]

class Project(BaseModel):
    project_id: str
    title: str
    description: str
    status: ProjectStatus
    budget: float
    start_date: datetime
    end_date: datetime
    creator_id: str
    roles: List[ProjectRole]
    media_files: List[str]
    created_at: datetime
    updated_at: datetime

# In-memory storage for demonstration
projects = {}

@app.post("/projects/", response_model=Project)
async def create_project(project: Project):
    if project.project_id in projects:
        raise HTTPException(status_code=400, detail="Project already exists")
    projects[project.project_id] = project
    return project

@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects[project_id]

@app.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: Project):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    project.updated_at = datetime.utcnow()
    projects[project_id] = project
    return project

@app.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    del projects[project_id]
    return {"message": "Project deleted"}

@app.post("/projects/{project_id}/roles")
async def add_role(project_id: str, role: ProjectRole):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    project = projects[project_id]
    project.roles.append(role)
    return {"message": "Role added successfully"}

@app.post("/projects/{project_id}/media")
async def add_media(project_id: str, media_url: str):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    project = projects[project_id]
    project.media_files.append(media_url)
    return {"message": "Media file added successfully"}
