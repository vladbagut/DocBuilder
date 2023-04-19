1. Am instalat nodejs (contine npm = package manager and installer)
   si cu npm am instalat angular client (npm install -g @angular/cli)

2. Am creat proiectul angular:
   - am deschis cu Visual Code un director nou unde va fi proiectul
   - am deschis un terminal cmd
   - cu angular client(ng) am creat o aplicatie angular
     ng new nume_app
   - cd nume_app - te muta in folderul radacina a aplicatiei create;
   - npm install
   - run aplicatie:
     ng serve -o SAU
     ng serve + F5 ( pt F5 trebuie editat in vscode->launch.json: http://localhost:4200 )

Alte pachete instalate:

- tesseract : extragere text dintr-o imagine
- pdfmake: generare pdf dintr-un template
- Angular Material - pentru controale
- bootstrap- pentru styles

3. Am pus proiectul pe GitHub
   (alte VSC (version control systems): Github, Gitlab, Bitbucket, Mercurial, Subversion:
   https://disbug.io/en/blog/github-vs-gitlab-vs-bitbucket)

   - m-am logat pe gitHub
   - am facut un git repository nou
     (am urmarit apoi comenzile din readme-ul generat odata cu crearea repository-ului - de acolo se copiaza link-ul de git: https://github.com/vladbagut/DocBuilder.git)
   - am deschis proiectul cu visual code, si am facut legatura intre proiect si git:
   - git remote add origin https://github.com/vladbagut/DocBuilder.git
   - git branch -M main
   - git push -u origin main

4. FireBase
   https://dev.to/cristofima/deploy-an-angular-app-to-firebase-via-github-actions-3ge6

   - npm install -g firebase-tools
   - firebase login
   - firebase init (doar Firebase CLI features: Hosting ) - am pastrat secret key de la sfarsit !

   - build aplicatie: ng build --prod (genereaza dist/DocBuilder sau ce este seatat ca output in angular.json)
   - deploy: firebase deploy SAU firebase deploy --only hosting

5. Continuous integration (build si deploy automat de pe git pe firebase)
   - in package.json: "build:prod": "ng build --prod"
   - pe gitHub am updatat la secret - key
   - in .github\workflows am configurat ...yml pt continuous integration

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
