from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid

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

class ProjectCreate(BaseModel):
    title: str
    description: str
    budget: float

class Project(BaseModel):
    project_id: str
    title: str
    description: str
    status: ProjectStatus = ProjectStatus.DRAFT
    budget: float
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    creator_id: Optional[str] = None
    roles: List[ProjectRole] = []
    media_files: List[str] = []
    created_at: datetime
    updated_at: datetime

# In-memory storage for demonstration
projects = {}

@app.post("/projects/", response_model=Project)
async def create_project(project: ProjectCreate):
    now = datetime.utcnow()
    project_id = str(uuid.uuid4())
    
    project_data = Project(
        project_id=project_id,
        title=project.title,
        description=project.description,
        budget=project.budget,
        created_at=now,
        updated_at=now
    )
    
    projects[project_id] = project_data
    return project_data

@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects[project_id]

@app.get("/projects/", response_model=List[Project])
async def list_projects():
    return list(projects.values())

@app.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectCreate):
    if project_id not in projects:
        raise HTTPException(status_code=404, detail="Project not found")
    
    existing_project = projects[project_id]
    updated_project = existing_project.copy(update={
        "title": project.title,
        "description": project.description,
        "budget": project.budget,
        "updated_at": datetime.utcnow()
    })
    
    projects[project_id] = updated_project
    return updated_project

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
