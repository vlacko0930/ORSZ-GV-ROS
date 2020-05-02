<template>
  <section class="home">
    <b-modal :active.sync="tobbijatekosmodal.modal&&!jatek" full-screen scroll="keep">
        <div class="card">
          <div class="card-header">
            <p class="card-header-title">Játékosok által beírt szavak</p>
							<b-icon icon="info" class="card-header-icon"/>
          </div>
          <div class="card-content">
              <b-table :data="tobbijatekosmodal.tablazat.adatok" bordered striped narrowed hoverable >
                      <template slot-scope="props">
                          <b-table-column field="jatekos" label="Játékos">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="gamepad"/>{{column.label}}
                            </template>
                              <b-icon icon="gamepad"/>{{ props.row.jatekos }}
                          </b-table-column>
                          <b-table-column field="orszag" label="ORSZÁG">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="flag"/>{{column.label}}
                            </template>
                              <b-icon icon="flag"/>{{ props.row.orszag }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.orszag, 'ORSZÁG')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="varos" label="VÁROS">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="city"/>{{column.label}}
                            </template>
                              <b-icon icon="city"/>{{ props.row.varos }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.varos, 'VÁROS')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="fiu" label="FIÚ">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="mars"/>{{column.label}}
                            </template>
                              <b-icon icon="mars"/>{{ props.row.fiu }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.fiu, 'FIÚ')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="lany" label="LÁNY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="venus"/>{{column.label}}
                            </template>
                              <b-icon icon="venus"/>{{ props.row.lany }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.lany, 'LÁNY')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="allat" label="ÁLLAT">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="paw"/>{{column.label}}
                            </template>
                              <b-icon icon="paw"/>{{ props.row.allat }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.allat, 'ÁLLAT')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="noveny" label="NÖVÉNY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="leaf"/>{{column.label}}
                            </template>
                              <b-icon icon="leaf"/>{{ props.row.noveny }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.noveny, 'NÖVÉNY')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                          <b-table-column field="targy" label="TÁRGY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="toolbox"/>{{column.label}}
                            </template>
                              <b-icon icon="toolbox"/>{{ props.row.targy }}<br/>
                              <b-button icon-left="poll" @click="szavazasinditasa(props.row.targy, 'TÁRGY')" type="is-primary">Szavazás indítása a szóról</b-button>
                          </b-table-column>
                      </template>

                      <template slot="empty">
                          <section class="section">
                              <div class="content has-text-grey has-text-centered">
                                  <p>
                                      <b-icon
                                          icon="frown"
                                          size="is-large">
                                      </b-icon>
                                  </p>
                                  <p>Üres</p>
                              </div>
                          </section>
                      </template>
                  </b-table>
                  <b-table :data="jatekosok" v-if="tobbijatekosmodal.ponttablazatlathatosag" bordered striped narrowed hoverable >
                          <template slot-scope="props">
                              <b-table-column field="jatekos" label="Játékos">
                                <template slot="header" slot-scope="{ column }">
                                  <b-icon icon="gamepad"/>{{column.label}}
                                </template>
                                  <b-icon icon="gamepad"/>{{ props.row.nev }}
                              </b-table-column>
                              <b-table-column field="pont" label="PONT" :key="props.row.pont">
                                <template slot="header" slot-scope="{ column }">
                                  <b-icon icon="star"/>{{column.label}}
                                </template>
                                  <b-icon icon="star"/>{{ props.row.pont }}
                              </b-table-column>
                          </template>

                          <template slot="empty">
                              <section class="section">
                                  <div class="content has-text-grey has-text-centered">
                                      <p>
                                          <b-icon
                                              icon="frown"
                                              size="is-large">
                                          </b-icon>
                                      </p>
                                      <p>Üres</p>
                                  </div>
                              </section>
                          </template>
                      </b-table>
						</div>
          </div>
          <div class="card-footer">
            <b-button icon-left="play" rounded type="is-success" @click="elindithato()">A játék felőlem indítható</b-button>
          </div>
    </b-modal>
    <b-field v-if="jatekid==-1" label="Név" grouped position="is-centered">
      <b-input v-model="nev" icon="signature" rounded/>
    </b-field>
    <b-field position="is-centered" v-if="jatekid==-1&&this.nev">
      <b-radio v-model="szobamod"
                  native-value="0">
                  <b-icon icon="door-open"/>Csatlakozás meglévő szobához
      </b-radio>
      <b-radio v-model="szobamod"
                  native-value="1">
                  <b-icon icon="plus"/>Új szoba
      </b-radio>
    </b-field>
    <b-button v-if="jatekid==-1&&szobamod==1&&this.nev" type="is-success" icon-left="plus" @click="ujjatek">Új játék</b-button>
    <b-field label="Játék azonosítója" grouped position="is-centered" v-if="jatekid==-1&&szobamod==0&&this.nev">
      <b-input rounded icon="terminal" v-model="csatljatekazonosito"/>
      <b-button v-if="csatljatekazonosito!=''" icon-left="door-open" @click="csatlakozasjatekhoz" rounded type="is-success">Csatlakozás játékhoz</b-button>
    </b-field>
    <p v-if="jatekid>-1"><b-icon icon="terminal"/>Játék azonosító: {{jatekid}}</p>
    <b-field label="Játékosok: " position="is-centered" grouped>
      <b-icon icon="gamepad"/><p v-for="j in jatekosok" :key="j.id">{{j.nev}}, </p>
    </b-field>
    <b-button type="is-success" icon-left="play" v-if="!indithato&&!jatek&&jatekid!=-1" @click="elindithato">A játék felőlem indítható</b-button>
    <p v-if="jatek">Betű: {{betu}}</p>
    <b-field v-if="jatek" label="Ország" position="is-centered">
      <b-input v-model="tablazat.uj.orszag" rounded icon="flag"/>
    </b-field>
    <b-field v-if="jatek" label="Város" position="is-centered">
      <b-input v-model="tablazat.uj.varos" rounded icon="city"/>
    </b-field>
    <b-field v-if="jatek" label="Fiú" position="is-centered">
      <b-input v-model="tablazat.uj.fiu" rounded icon="mars"/>
    </b-field>
    <b-field v-if="jatek" label="Lány" position="is-centered">
      <b-input v-model="tablazat.uj.lany" rounded icon="venus"/>
    </b-field>
    <b-field v-if="jatek" label="Állat" position="is-centered">
      <b-input v-model="tablazat.uj.allat" rounded icon="paw"/>
    </b-field>
    <b-field v-if="jatek" label="Növény" position="is-centered">
      <b-input v-model="tablazat.uj.noveny" rounded icon="leaf"/>
    </b-field>
    <b-field v-if="jatek" label="Tárgy" position="is-centered">
      <b-input v-model="tablazat.uj.targy" rounded icon="toolbox"/>
    </b-field>
    <b-button rounded expanded @click="stop" v-if="jatek" type="is-danger">STOP</b-button>
    <b-table
            :data="tablazat.adatok"
            bordered
            striped
            narrowed
            hoverable>

            <template slot-scope="props">
                <b-table-column field="betu" label="BETŰ">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="heading"/>{{column.label}}
                  </template>
                    <b-icon icon="heading"/>{{ props.row.betu }}
                </b-table-column>
                <b-table-column field="orszag" label="ORSZÁG">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="flag"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.o)}"><b-icon icon="flag"/>{{ props.row.orszag }}</div>
                </b-table-column>
                <b-table-column field="varos" label="VÁROS">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="city"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.v)}"><b-icon icon="city"/>{{ props.row.varos }}</div>
                </b-table-column>
                <b-table-column field="fiu" label="FIÚ">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="mars"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.f)}"><b-icon icon="mars"/>{{ props.row.fiu }}</div>
                </b-table-column>
                <b-table-column field="lany" label="LÁNY">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="venus"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.l)}"><b-icon icon="venus"/>{{ props.row.lany }}</div>
                </b-table-column>
                <b-table-column field="allat" label="ÁLLAT">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="paw"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.a)}"><b-icon icon="paw"/>{{ props.row.allat }}</div>
                </b-table-column>
                <b-table-column field="noveny" label="NÖVÉNY">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="leaf"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.n)}"><b-icon icon="leaf"/>{{ props.row.noveny }}</div>
                </b-table-column>
                <b-table-column field="targy" label="TÁRGY">
                  <template slot="header" slot-scope="{ column }">
                    <b-icon icon="toolbox"/>{{column.label}}
                  </template>
                    <div :style="{color: ervenyes(props.row.ervenyesseg.t)}"><b-icon icon="toolbox"/>{{ props.row.targy }}</div>
                </b-table-column>
                <b-table-column field="pont" label="PONT">
                  <template slot="header" slot-scope="{column}">
                    <b-icon icon="star"/>{{column.label}}
                  </template>
                  <b-icon icon="star"/>{{pont(props.row.ervenyesseg)}}
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="frown"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Üres</p>
                    </div>
                </section>
            </template>
        </b-table>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      jatekid: -1,
      nev: "",
      szobamod: 0,
      csatljatekazonosito: '',
      jatekosok: [],
      indithato: false,
      betu: '',
      jatek: false,
      tablazat: {
        adatok:[],
        uj: {orszag:"", varos: "", fiu: "", lany: "", allat:"", noveny: "", targy: "", ervenyesseg: {
          o: false,
          v:false,
          f:false,
          l:false,
          a:false,
          n:false,
          t:false
        }}
      },
      tobbijatekosmodal: {
        modal: false,
        tablazat: {
          adatok: []
        },
        ponttablazatlathatosag: true,
        ponttablazatoszlopok: [
          {
            field: 'nev',
            label: 'Játékos'
          },
          {
            field: 'pont',
            label: 'PONT'
          }
        ]
      },
      szavazas: {
        id: null, szo: null, rubrika:null
      }
    }
  },
  sockets: {
    szavazaseredmenye(eredmeny) {
      if(!eredmeny.letezik){
        switch(eredmeny.rubrika) {
          case 'ORSZÁG':
            if(this.tablazat.uj.orszag==eredmeny.szo) this.tablazat.uj.ervenyesseg.o=false;
            break;
          case 'VÁROS':
            if(this.tablazat.uj.varos==eredmeny.szo) this.tablazat.uj.ervenyesseg.v=false;
            break;
          case 'FIÚ':
            if(this.tablazat.uj.fiu==eredmeny.szo) this.tablazat.uj.ervenyesseg.f=false;
            break;
          case 'LÁNY':
            if(this.tablazat.uj.lany==eredmeny.szo) this.tablazat.uj.ervenyesseg.l=false;
            break;
          case 'ÁLLAT':
            if(this.tablazat.uj.allat==eredmeny.szo) this.tablazat.uj.ervenyesseg.a=false;
            break;
          case 'NÖVÉNY':
            if(this.tablazat.uj.noveny==eredmeny.szo) this.tablazat.uj.ervenyesseg.n=false;
            break;
          case 'TÁRGY':
            if(this.tablazat.uj.targy==eredmeny.szo) this.tablazat.uj.ervenyesseg.t=false;
            break;
        }
        this.$socket.emit("pont",{pont: this.osszespont(), jatekid: this.jatekid});
      }
      this.$buefy.toast.open({
        message: eredmeny.letezik ? eredmeny.szo+" "+eredmeny.rubrika+" létezik." : eredmeny.szo+" "+eredmeny.rubrika+" nem létezik.",
        type:  eredmeny.letezik ? 'is-success' : 'is-danger'
      })
    },
    szavazas(szavazasadatok) {
      this.szavazas=szavazasadatok;
      this.$buefy.dialog.confirm({
        type: 'is-primary',
        hasIcon: true,
        icon: 'poll',
        title: 'SZAVAZÁS',
        message: 'Létezik olyan '+szavazasadatok.rubrika+" hogy "+szavazasadatok.szo+"?",
        cancelText: 'NEM',
        confirmText: 'IGEN',
        onConfirm: () => this.$socket.emit("szavazat",{jatekid: this.jatekid, szavazasid: this.szavazas.id, szavazat: 1}),
        onCancel: () => this.$socket.emit("szavazat",{jatekid: this.jatekid,szavazasid: this.szavazas.id,szavazat:2})
      })
    },
    jatekid(id) {
      this.jatekid=id;
    },
    jatekosvaltozas(valtozas) {
      if(valtozas.irany==1) this.jatekosok.push({id: valtozas.jatekos.id, nev: valtozas.jatekos.nev, pont: 0})
      else if(valtozas.irany==-1)  this.jatekosok.splice(this.jatekosok.findIndex(j => j.id==valtozas.jatekos),1)
      console.log(this.jatekosok)
    },
    jatekosok(jatekosok) {
      this.jatekosok=jatekosok;
    },
    start(betu) {
      this.betu=betu
      if(this.tobbijatekosmodal.modal) {
        this.tobbijatekosmodal.modal=false;

        this.tablazat.adatok.push(this.tablazat.uj);
        this.tobbijatekosmodal.tablazat.adatok=[];
      }
      this.tablazat.uj= {betu: this.betu, orszag:"", varos: "", fiu: "", lany: "", allat:"", noveny: "", targy: "", ervenyesseg: {
        o: false,
        v:false,
        f:false,
        l:false,
        a:false,
        n:false,
        t:false
      }}
      this.indithato=false;
      this.jatek=true;
    },
    stop() {
      this.tablazat.uj.orszag=this.tablazat.uj.orszag.toUpperCase();
      this.tablazat.uj.varos=this.tablazat.uj.varos.toUpperCase();
      this.tablazat.uj.fiu=this.tablazat.uj.fiu.toUpperCase();
      this.tablazat.uj.lany=this.tablazat.uj.lany.toUpperCase();
      this.tablazat.uj.allat=this.tablazat.uj.allat.toUpperCase();
      this.tablazat.uj.noveny=this.tablazat.uj.noveny.toUpperCase();
      this.tablazat.uj.targy=this.tablazat.uj.targy.toUpperCase();
      this.$socket.emit("vegallas",{...this.tablazat.uj, jatekid: this.jatekid});
      this.tobbijatekosmodal.modal=true
      this.jatek=false;
    },
    jatekosszavai(jatekos) {
      this.tobbijatekosmodal.tablazat.adatok.push(jatekos)
      this.tablazat.uj.betu.split(",").forEach(betu => {
        if(this.tablazat.uj.orszag.startsWith(betu)&&this.tablazat.uj.orszag.length>betu.length) this.tablazat.uj.ervenyesseg.o=true;
        if(this.tablazat.uj.varos.startsWith(betu)&&this.tablazat.uj.varos.length>betu.length) this.tablazat.uj.ervenyesseg.v=true;
        if(this.tablazat.uj.fiu.startsWith(betu)&&this.tablazat.uj.fiu.length>betu.length) this.tablazat.uj.ervenyesseg.f=true;
        if(this.tablazat.uj.lany.startsWith(betu)&&this.tablazat.uj.lany.length>betu.length) this.tablazat.uj.ervenyesseg.l=true;
        if(this.tablazat.uj.allat.startsWith(betu)&&this.tablazat.uj.allat.length>betu.length) this.tablazat.uj.ervenyesseg.a=true;
        if(this.tablazat.uj.noveny.startsWith(betu)&&this.tablazat.uj.noveny.length>betu.length) this.tablazat.uj.ervenyesseg.n=true;
        if(this.tablazat.uj.targy.startsWith(betu)&&this.tablazat.uj.targy.length>betu.length) this.tablazat.uj.ervenyesseg.t=true;
      })
      this.tablazat.uj.ervenyesseg.o=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.orszag==this.tablazat.uj.orszag).length==1&&this.tablazat.uj.ervenyesseg.o;
      this.tablazat.uj.ervenyesseg.v=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.varos==this.tablazat.uj.varos).length==1&&this.tablazat.uj.ervenyesseg.v;
      this.tablazat.uj.ervenyesseg.f=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.fiu==this.tablazat.uj.fiu).length==1&&this.tablazat.uj.ervenyesseg.f;
      this.tablazat.uj.ervenyesseg.l=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.lany==this.tablazat.uj.lany).length==1&&this.tablazat.uj.ervenyesseg.l;
      this.tablazat.uj.ervenyesseg.a=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.allat==this.tablazat.uj.allat).length==1&&this.tablazat.uj.ervenyesseg.a;
      this.tablazat.uj.ervenyesseg.n=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.noveny==this.tablazat.uj.noveny).length==1&&this.tablazat.uj.ervenyesseg.n;
      this.tablazat.uj.ervenyesseg.t=this.tobbijatekosmodal.tablazat.adatok.filter(t => t.targy==this.tablazat.uj.targy).length==1&&this.tablazat.uj.ervenyesseg.t;
      this.$socket.emit("pont",{pont: this.osszespont(), jatekid: this.jatekid});
    },
    jatekospontja(jp) {
      this.jatekosok.find(j => j.id==jp.id).pont=jp.pont;
      this.tobbijatekosmodal.ponttablazatlathatosag = false;

       this.$nextTick(() => {
         this.tobbijatekosmodal.ponttablazatlathatosag = true;
       });
    }
  },
  methods: {
    szavazasinditasa(szo, rubrika){
      this.$socket.emit("szavazasinditasa", {szo, rubrika, jatekid: this.jatekid});
    },
    osszespont() {
      var osszpont= this.pont(this.tablazat.uj.ervenyesseg);
      this.tablazat.adatok.forEach(adat => osszpont+=this.pont(adat.ervenyesseg))
      return osszpont;
    },
    pont(e) {
      var pont=0;
      if(e.o) pont++
      if(e.v) pont++
      if(e.f) pont++
      if(e.l) pont++
      if(e.a) pont++
      if(e.n) pont++
      if(e.t) pont++
      return pont;
    },
    ervenyes(e){
      if(!e){
        return 'red';
      }
      else{
        return 'black'
      }
    },
    elindithato() {
      this.$socket.emit("indithato",this.jatekid)
      this.indithato=true;
    },
    ujjatek() {
      this.$socket.emit("ujjatek",this.nev)
    },
    csatlakozasjatekhoz(){
      this.$socket.emit("csatlakozasjatekhoz",{nev:this.nev, id: this.csatljatekazonosito})
    },
    stop() {
      this.$socket.emit("stop",this.jatekid);
    }
  }
}
</script>
