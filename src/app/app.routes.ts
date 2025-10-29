import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';
import { AboutComponent } from './pages/about/about';
import { AddprofileComponent } from './pages/addprofile/addprofile';
import { SettingsComponent } from './pages/settings/settings';
import { ResourcesComponent } from './pages/resources/resources';
import { EventsComponent } from './pages/events/events';
import { CreatepostComponent } from './pages/createpost/createpost';
import { FindmentorComponent } from './pages/findmentor/findmentor';
import { JoinprogramComponent } from './pages/joinprogram/joinprogram';
import { ProfileComponent } from './pages/profile/profile';
import { MypostsComponent } from './pages/myposts/myposts';
import { ChatComponent } from './pages/chat/chat';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },
    
    {
    path: 'register',
        component: RegisterComponent
    }, 

    {
        path: 'about',
        component: AboutComponent
    },

    {
    path: 'addprofile',
        component: AddprofileComponent
    }, 

    {
    path: 'settings',
        component: SettingsComponent
    }, 

    {
    path: 'resources',
        component: ResourcesComponent
    }, 

    {
        path: 'events',
        component: EventsComponent
    }, 

    {
    path: 'createpost',
        component: CreatepostComponent
    },

    {
    path: 'findmentor',
        component: FindmentorComponent
    },

    {
    path: 'joinprogram',
        component: JoinprogramComponent
    },

    {
    path: 'profile',
        component: ProfileComponent
    },
    
    {
        path: 'myposts',
        component: MypostsComponent
    },

    { path: 'chat', component: ChatComponent }

];


