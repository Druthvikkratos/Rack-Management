import {ComponentFixture, TestBed} from '@angular/core/testing'

import {FormListComponent} from './forms-list.component'

describe('FormListComponent', () => {
  let component: FormListComponent
  let fixture: ComponentFixture<FormListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormListComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
