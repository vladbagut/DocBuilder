1. Am instalat nodejs (contine npm = package manager and installer)
   si cu npm am instalat angular client (npm install -g @angular/cli)

2. Am creat un director, l-am deschis cu Visual Code
   am deschis un terminal cmd
   cu o comanda angular client(ng) am creat o aplicatie angular
   ng new licenta
   cd licenta - te muta in folderul radacina a aplicatiei create
   npm install - (optional, se reinstaleaza pachetele)
   ng serve + F5 ( ng serveste aplicatia, F5 incarca in browser linkul unde e hostuita(LOCAL) aplicatia: http://localhost:4200 )
   ng serve -o (acelasi lucru: ng serveste aplicatia si o deschide automat in browser)

Am instalat:

- tesseract : extragere text dintr-o imagine
- pdfmake: generare pdf dintr-un template
- Angular Material - pentru controale
- bootstrap- pentru styles

3. Am pus proiectul pe GitHub (version control systems(VSC) : Github, Gitlab, Bitbucket, Mercurial, Subversion: https://disbug.io/en/blog/github-vs-gitlab-vs-bitbucket)
   m-am logat pe gitHub
   am facut un git repository nou
   (am urmarit apoi comenzile din readme-ul generat odata cu crearea repository-ului)

   am deschis proiectul cu visual code, si intr-un terminal cmd am dat comenzile:
   git remote add origin https://github.com/bagutirina/DocBuilder.git
   git branch -M main
   git push -u origin main

4. FireBase
   https://www.c-sharpcorner.com/article/how-to-deploy-and-host-an-angular-application-on-firebase/

Cum functioneaza aplicatia:

1. un file (imagine) e uploadat folosind:
   - <input  type="file" > - picker de selectie a unui fisier
     sau
   - drag & drop al elementelor html( am facut o directiva angular 'appDragDrop' care prinde un eveniment de drag&drop si preia fisierul dropp-uit)

in urma upload-ului se obtine un File (sau Blob = un fel de obiect 'File' care poate fi citit ca text sau binary data )

2.  din File se citeste continutul cu un FileReader si se transforma intr-un string (base64)

             FileReader(File) => string-base64

3.  stringul este incarcat si afisat intr-un element img, si se decupeaza din el o portiune - toate cu ajutorul unei directive CropImageDirective care face:
    - se ataseaza de elementul img in care este imaginea uploadata (base64)
    - creaza un element html canvas si il suprapune peste imagine
    - pe evenimentele de mose down,move,up se deseneaza un rectangle
    - pe mouse up, decupeaza din imaginea initiala bucata de la coordonatele rectangle-ului desenat deasupra
    - transforma totul intr-un string base64

pasul 3 de fapt face:
base64 - intreaga imagine => base64 - o bucata de imagine

4.  bucata de imagine(base64) este preluata de tesseract.js (se apeleaza metoda worker.recognize(stringul_base64)) care extrage textul pe care il gaseste din imagine

           base64  =>  text extras (string)

- textul extras este impins in controalele din sablon sau in consola
  daca campul selectat era "Image", se sare peste pasul 4 (nu se mai extrage text) si ramane base64 si se incarca in zona de imagine
- Pdfmake ia valorile din variabile, le pune intr-un sablon si genereaza un pdf

---

# Licenta

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
