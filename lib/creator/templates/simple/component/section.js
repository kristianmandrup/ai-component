import { Router } from 'aurelia-router';

@inject(Router)
export class <%= className %>Section {
  constructor(router){
    this.heading = '<%= className %> section';
    this.router = router;
    router.configure(config => {
      config.map([
        { route: [''],  moduleId: './index', nav: true }
      ]);
    });
  }
}