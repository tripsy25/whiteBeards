import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {RegisterComponent} from '../users/register.component';
import {SignInComponent} from '../users/sign-in.component';


@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SharedModule
    ],
    declarations:[RegisterComponent, SignInComponent],
    exports: [],
    providers:[]
})

export class UsersModule{

}