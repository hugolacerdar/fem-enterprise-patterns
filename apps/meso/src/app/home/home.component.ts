import { Component, OnInit } from '@angular/core';

class ProjectStore {
  constructor(private readonly state: ProjectsState) {}

  getState(): ProjectsState {
    return this.state;
  }

  select(key: string): Project | Project[] {
    return this.state[key];
  }
}

interface BaseEntity {
  id: string | null;
}
interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

const kitty: Client = {
  id: '1',
  firstName: 'Kitty',
  lastName: 'Pryde',
  company: 'X-Men, Inc',
};

const charles: Client = {
  id: '2',
  firstName: 'Charles',
  lastName: 'Xavier',
  company: 'NA',
};

const clients: Client[] = [charles, kitty];
interface ClientsState {
  clients: Client[];
  currentClient: Client;
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

const initialClientState: ClientsState = {
  clients,
  currentClient: newClient,
};

interface Project extends BaseEntity {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  clientId: string;
}

const projectOne: Project = {
  id: '1',
  name: 'New Project One',
  startDate: new Date(),
  endDate: null,
  clientId: kitty.id,
};

const projectTwo: Project = {
  id: '2',
  name: 'New Project Two',
  startDate: null,
  endDate: null,
  clientId: charles.id,
};

const projects: Project[] = [projectOne, projectTwo];
interface ProjectsState {
  projects: Project[];
  currentProject: Project;
}

const newProject: Project = {
  id: null,
  name: 'New Project',
  startDate: null,
  endDate: null,
  clientId: newClient.id,
};

const initialProjectState: ProjectsState = {
  projects,
  currentProject: newProject,
};

interface ApplicationState {
  clientsState: ClientsState;
  projectsState: ProjectsState;
}

const appState: ApplicationState = {
  clientsState: initialClientState,
  projectsState: initialProjectState,
};

const store = new ProjectStore(initialProjectState);

const tango = store.select('projects');

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
