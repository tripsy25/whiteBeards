import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CatalogRepositoryService } from '../catalog/catalog-repository.service';
import { UserRepositoryService } from '../services/user-repository.service';
import { IClass, ICourse } from './class.model';
import { FilterClassesService } from './filter-classes.service';

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit{
  classes: IClass[] = [];
  visibleClasses: IClass[] = [];
  orderByField: string =  '';

  constructor(
    private catalogRepository: CatalogRepositoryService,
    public userRepository: UserRepositoryService,
    private filterClassesService: FilterClassesService
  ) {}

  ngOnInit() {
    this.catalogRepository.getCatalog().subscribe((classes: IClass[]) => {
      this.classes = classes;
      this.applyFilter('');
    });
  }

  mutateFirstProfessor(){
    this.visibleClasses[0].professor = "Lucarion"
  }

  updateFirstProfessor(){
    this.visibleClasses = [
      {...this.visibleClasses[0], professor: "Lucarion"},
      ...this.visibleClasses.slice(1)
    ];
  }

  enroll(classToEnroll: IClass) {
    classToEnroll.processing = true;
    this.userRepository.enroll(classToEnroll.classId).subscribe({
      error: (err) => {
        console.error(err);
        classToEnroll.processing = false;
      },
      complete: () => {
        classToEnroll.processing = false;
        classToEnroll.enrolled = true;
      },
    });
  }

  drop(classToDrop: IClass) {
    classToDrop.processing = true;
    this.userRepository.drop(classToDrop.classId).subscribe({
      error: (err) => {
        console.error(err);
        classToDrop.processing = false;
      },
      complete: () => {
        classToDrop.processing = false;
        classToDrop.enrolled = false;
      },
    });
  }

  applyFilter(filter: string){
    this.visibleClasses = this.filterClassesService.filterClasses(filter, this.classes);
  }
}
