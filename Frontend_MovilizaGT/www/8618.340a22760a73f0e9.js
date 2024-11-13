"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8618],{8618:(k,u,a)=>{a.r(u),a.d(u,{RegisterPageModule:()=>h});var c=a(177),t=a(4341),o=a(4742),m=a(8986),e=a(3953),g=a(7692),d=a(3656);const p=[{path:"",component:(()=>{class n{constructor(i,r,s){this.fb=i,this.generalService=r,this.navCtrl=s,this.passwordStrengthText="",this.passwordStrengthColor="medium",this.registerForm=this.fb.group({fullName:["",t.k0.required],phone:["",[t.k0.required,t.k0.pattern("^[0-9]{8,10}$")]],email:["",[t.k0.required,t.k0.email]],dpi:["",t.k0.required],gender:["",t.k0.required],age:["",[t.k0.required,t.k0.min(18)]],pass:["",[t.k0.required,t.k0.minLength(6)]],confirmPassword:["",t.k0.required]},{validator:this.passwordMatchValidator})}ngOnInit(){this.registerForm=this.fb.group({fullName:["",t.k0.required],phone:["",[t.k0.required,t.k0.pattern("^[0-9]{8,10}$")]],email:["",[t.k0.required,t.k0.email]],dpi:["",t.k0.required],gender:["",t.k0.required],age:["",[t.k0.required,t.k0.min(18)]],pass:["",[t.k0.required,t.k0.minLength(6)]],confirmPassword:["",t.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(i){return console.log(i),(i.get("pass")?.value||"")===(i.get("confirmPassword")?.value||"")?null:{mismatch:!0}}checkPasswordStrength(){const i=this.registerForm.get("pass")?.value||"";console.log(i),i.length<6?(this.passwordStrengthText="D\xe9bil",this.passwordStrengthColor="danger"):i.length>=6&&/[A-Z]/.test(i)&&/[0-9]/.test(i)?(this.passwordStrengthText="Fuerte",this.passwordStrengthColor="success"):(this.passwordStrengthText="Media",this.passwordStrengthColor="warning")}onRegister(){this.registerForm.valid?(console.log(this.registerForm.value),this.generalService.post("api/auth/register",this.registerForm.value).subscribe({next:r=>{console.log("Registro exitoso",r),this.navCtrl.navigateRoot("/login")},error:r=>{console.error("Error en el registro",r)}})):console.log("Formulario inv\xe1lido")}uploadLicenseFront(){}uploadLicenseBack(){}uploadDpiFront(){}uploadDpiBack(){}static#e=this.\u0275fac=function(r){return new(r||n)(e.rXU(t.ok),e.rXU(g.O),e.rXU(d.q9))};static#t=this.\u0275cmp=e.VBU({type:n,selectors:[["app-register"]],decls:77,vars:4,consts:[[1,"ion-padding"],[3,"ngSubmit","formGroup"],["position","floating"],["formControlName","fullName","type","text"],["formControlName","phone","type","tel"],["formControlName","email","type","email"],["formControlName","dpi","type","text"],["formControlName","gender","placeholder","Seleccione"],["value","male"],["value","female"],["value","other"],["formControlName","age","type","number"],["formControlName","pass","type","password",3,"ionInput"],["lines","none"],[3,"color"],["formControlName","confirmPassword","type","password"],["expand","block",3,"click"],["expand","full","type","submit",3,"disabled"]],template:function(r,s){1&r&&(e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.EFF(3,"Registro"),e.k0s()()(),e.j41(4,"ion-content",0)(5,"ion-card")(6,"ion-card-header")(7,"ion-card-title"),e.EFF(8,"Crear Cuenta"),e.k0s()(),e.j41(9,"ion-card-content")(10,"form",1),e.bIt("ngSubmit",function(){return s.onRegister()}),e.j41(11,"ion-item")(12,"ion-label",2),e.EFF(13,"Nombre Completo"),e.k0s(),e.nrm(14,"ion-input",3),e.k0s(),e.j41(15,"ion-item")(16,"ion-label",2),e.EFF(17,"Tel\xe9fono"),e.k0s(),e.nrm(18,"ion-input",4),e.k0s(),e.j41(19,"ion-item")(20,"ion-label",2),e.EFF(21,"Correo Electr\xf3nico"),e.k0s(),e.nrm(22,"ion-input",5),e.k0s(),e.j41(23,"ion-item")(24,"ion-label",2),e.EFF(25,"DPI"),e.k0s(),e.nrm(26,"ion-input",6),e.k0s(),e.j41(27,"ion-item")(28,"ion-label"),e.EFF(29,"G\xe9nero"),e.k0s(),e.j41(30,"ion-select",7)(31,"ion-select-option",8),e.EFF(32,"Masculino"),e.k0s(),e.j41(33,"ion-select-option",9),e.EFF(34,"Femenino"),e.k0s(),e.j41(35,"ion-select-option",10),e.EFF(36,"Otro"),e.k0s()()(),e.j41(37,"ion-item")(38,"ion-label",2),e.EFF(39,"Edad"),e.k0s(),e.nrm(40,"ion-input",11),e.k0s(),e.j41(41,"ion-item")(42,"ion-label",2),e.EFF(43,"Contrase\xf1a"),e.k0s(),e.j41(44,"ion-input",12),e.bIt("ionInput",function(){return s.checkPasswordStrength()}),e.k0s()(),e.j41(45,"ion-item",13)(46,"ion-label",14),e.EFF(47),e.k0s()(),e.j41(48,"ion-item")(49,"ion-label",2),e.EFF(50,"Confirmar Contrase\xf1a"),e.k0s(),e.nrm(51,"ion-input",15),e.k0s(),e.nrm(52,"br"),e.j41(53,"ion-item-divider"),e.EFF(54,"Im\xe1genes Opcionales"),e.k0s(),e.j41(55,"ion-item")(56,"ion-label"),e.EFF(57,"Imagen Licencia (Frente)"),e.k0s(),e.j41(58,"ion-button",16),e.bIt("click",function(){return s.uploadLicenseFront()}),e.EFF(59,"Subir Imagen"),e.k0s()(),e.j41(60,"ion-item")(61,"ion-label"),e.EFF(62,"Imagen Licencia (Reverso)"),e.k0s(),e.j41(63,"ion-button",16),e.bIt("click",function(){return s.uploadLicenseBack()}),e.EFF(64,"Subir Imagen"),e.k0s()(),e.j41(65,"ion-item")(66,"ion-label"),e.EFF(67,"Imagen DPI (Frente)"),e.k0s(),e.j41(68,"ion-button",16),e.bIt("click",function(){return s.uploadDpiFront()}),e.EFF(69,"Subir Imagen"),e.k0s()(),e.j41(70,"ion-item")(71,"ion-label"),e.EFF(72,"Imagen DPI (Reverso)"),e.k0s(),e.j41(73,"ion-button",16),e.bIt("click",function(){return s.uploadDpiBack()}),e.EFF(74,"Subir Imagen"),e.k0s()(),e.j41(75,"ion-button",17),e.EFF(76,"Registrarse"),e.k0s()()()()()),2&r&&(e.R7$(10),e.Y8G("formGroup",s.registerForm),e.R7$(36),e.Y8G("color",s.passwordStrengthColor),e.R7$(),e.JRh(s.passwordStrengthText),e.R7$(28),e.Y8G("disabled",!s.registerForm.valid))},dependencies:[t.qT,t.BC,t.cb,o.Jm,o.b_,o.I9,o.ME,o.tN,o.W9,o.eU,o.$w,o.uz,o.Dg,o.he,o.Nm,o.Ip,o.BC,o.ai,o.su,o.Je,o.Gw,t.j4,t.JD]})}return n})()}];let F=(()=>{class n{static#e=this.\u0275fac=function(r){return new(r||n)};static#t=this.\u0275mod=e.$C({type:n});static#o=this.\u0275inj=e.G2t({imports:[m.iI.forChild(p),m.iI]})}return n})(),h=(()=>{class n{static#e=this.\u0275fac=function(r){return new(r||n)};static#t=this.\u0275mod=e.$C({type:n});static#o=this.\u0275inj=e.G2t({imports:[c.MD,t.YN,o.bv,F,t.YN,t.X1]})}return n})()}}]);