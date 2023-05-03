## Instalare:

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
- ngx-resizable: pentru resizable panels (https://github.com/mng/ngx-resizable)
- angular2-signaturepad: pentru semnatura
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
   - firebase init (doar Firebase CLI features: Hosting ) - !!! la sfarsit se genereaza un token,
     care trebuie pastrat, va fi nevoie de el pe github pt. continuous integration
   - build aplicatie: ng build --prod (genereaza dist/DocBuilder sau ce este seatat ca output in angular.json)
   - deploy: firebase deploy SAU firebase deploy --only hosting

5. Continuous integration (build si deploy automat: cand se face commit pe git, se face automat deploy pe firebase)
   - in package.json: "build:prod": "ng build --prod"
   - pe gitHub am updatat la settings -> secret -> FIREBASE_TOKEN
   - in proiect, in .github\workflows am configurat firebase-hosting-merge.yml pt continuous integration

## Cum functioneaza aplicatia:

Am definit 2 directive angular, care se ataseaza la niste elemente html si le dau o functionalitate aparte. Cele doua directive stau la baza intregului flow de executie.

- drag-drop - directiva care se ocupa de drag/drop-ul unei imagini
- crop-image - directiva care se ocupa de crop o bucata de imagine dintr-una mai mare

1. drag-drop (appDragDrop)

- se ataseaza de elemente in care se poate face drop: containerul(div) in care se incarca imagini (partea stanga), input/img din formular (din partea dreapta)
- functionalitatea: capteaza evenimentele 'dragOver', 'drop' ale elementului html
- pe evenimentul 'dragOver': schimba background-ul elementului (alb) - ca sa sugereze ca acolo se poate face drop
- pe evenimentul 'drop' : capteaza imaginea trasa de user (poate fi o imagine din afara, sau o imagine crop-uita)
  si emite un eveniment cu imaginea (File-BLOB)

  File(BLOB): un obiect de tipul "File", din care se poate citi continutul (binary data) cu un reader

In continuare intra in actiune elementul de care a fost atasata directiva:  
 Elementul prinde evenimentul emis (care contine File-BLOB-ul) si pe handler executa:

- containerul : transforma File(BLOB) -> in Base64 string, si il da ca sursa la un img
- un element input : transforma File(BLOB) -> in Base64 string -> se apeleaza metoda tesseract.worker.recognize(base64String) (metoda primeste o imagine base64 si returneaza textul din ea) -> string-ul rezultat il adauga la text-ul din input
- un element img: transforma File(BLOB) -> in Base64 string, si il incarca ca sursa in img

  FILE (BLOB) -> Base64 string -> tesseract:( base64=>string) -> <input value=" ...string obtinut din imagine">
  FILE (BLOB) -> Base64 string -> <img src="...base64 string" >

2. crop-image (appCropImage)

- se ataseaza de un <img> in care este o imagine (<img src="...base64 string" appCropImage >)
- creaza un element html canvas de aceeasi dimensiune cu imaginea si il suprapune peste imagine
- canvas-ul fiind deasupra, capteaza toate evenimentele de "mose down", "mouse move" , "mouse up" si pe handlerele lor se deseneaza in contextul canvas-ului un rectangle
- pe "mouse up", se decupeaza din imaginea de sub canvas o zona de la coordonatele rectangle-ului desenat in canvas
- se creaza un element img cu imaginea crop-uita si se aseaza exact peste rectangle
- noul img fiind deasupra capteaza evenimentele de drag/drop, si va putea fi tras (ca orice element web img) -> si apoi intra directiva 1 in functiune
  (elementele care au appDragDrop vor reactiona cand se face dragOver peste ele si vor capta imaginea trasa la "drop")
- img mai are si context menu: cand se apasa pe o optiune din meniu, imaginea (base64 string) poate fi trimisa la un field sau la consola

## Pdfmake:

pe baza unui sablon care este completat cu valorile din formular, genereaza un pdf
