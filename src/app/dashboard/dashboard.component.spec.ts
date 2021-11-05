import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import { AngularMaterialModule } from '../core/angular-material.module';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let spinnerServiceMock: any;

  beforeEach(async () => {
    // mock window functions
    spinnerServiceMock = {
      show: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true)),
      hide: jest.fn().mockReturnValue(new Promise<any>((resolve, reject) => true))
    };
    component = new DashboardComponent(spinnerServiceMock);
  });
  
  it('should create', () => {
    const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
    Object.defineProperty(window.self, 'crypto', {
      value: {
        getRandomValues: (arr:any) => jest.fn().mockReturnValueOnce(new Uint32Array(10))
      }
    });
    component.ngOnInit();
    expect(ngOnInitSpy).toBeTruthy();
  });

  it('should pass', () => {
    const mGetRandomValues = jest.fn().mockReturnValueOnce(new Uint32Array(10));
    Object.defineProperty(window, 'crypto', {
      value: { getRandomValues: mGetRandomValues },
    });
    expect(component.()).toEqual(new Uint32Array(10));
    expect(mGetRandomValues).toBeCalledWith(new Uint8Array(1));
  });

  it('Incio filtro', () => {
    const filtroSpy = jest.spyOn(component, 'filtro');
    Object.defineProperty(window.self, 'crypto', {
      value: {
        getRandomValues: (arr:any) => jest.fn().mockReturnValueOnce(new Uint32Array(10))
      }
    });
    const event: any = 'Amanda';
    component.filtro(event);      
    expect(filtroSpy).toBeTruthy();
  });
});
