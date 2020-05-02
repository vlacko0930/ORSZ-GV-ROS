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
                              <b-icon icon="flag"/>{{ props.row.orszag }}
                          </b-table-column>
                          <b-table-column field="varos" label="VÁROS">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="city"/>{{column.label}}
                            </template>
                              <b-icon icon="city"/>{{ props.row.varos }}
                          </b-table-column>
                          <b-table-column field="fiu" label="FIÚ">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="mars"/>{{column.label}}
                            </template>
                              <b-icon icon="mars"/>{{ props.row.fiu }}
                          </b-table-column>
                          <b-table-column field="lany" label="LÁNY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="venus"/>{{column.label}}
                            </template>
                              <b-icon icon="venus"/>{{ props.row.lany }}
                          </b-table-column>
                          <b-table-column field="allat" label="ÁLLAT">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="paw"/>{{column.label}}
                            </template>
                              <b-icon icon="paw"/>{{ props.row.allat }}
                          </b-table-column>
                          <b-table-column field="noveny" label="NÖVÉNY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="leaf"/>{{column.label}}
                            </template>
                              <b-icon icon="leaf"/>{{ props.row.noveny }}
                          </b-table-column>
                          <b-table-column field="targy" label="TÁRGY">
                            <template slot="header" slot-scope="{ column }">
                              <b-icon icon="toolbox"/>{{column.label}}
                            </template>
                              <b-icon icon="toolbox"/>{{ props.row.targy }}
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
                  <b-table :data="jatekosok" bordered striped narrowed hoverable >
                          <template slot-scope="props">
                              <b-table-column field="jatekos" label="Játékos">
                                <template slot="header" slot-scope="{ column }">
                                  <b-icon icon="gamepad"/>{{column.label}}
                                </template>
                                  <b-icon icon="gamepad"/>{{ props.row.nev }}
                              </b-table-column>
                              <b-table-column field="pont" label="PONT">
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
  title: "Ország-város",
  name: 'Home',
  components: {
  },
  data() {
    return {
      seedNum: 0,
      jatekid: -1,
      nev: "",
      szobamod: 0,
      csatljatekazonosito: '',
      jatekosok: [],
      indithato: false,
      betu: '',
      jatek: false,
      tablazat: {
        adatok:[/*{betu: "A", orszag:"Albánia", varos: "Albertirsa", fiu: "Absalom", lany: "Anna", allat:"Anakonda", noveny: "Alma", targy: "Almahámozó"}*/],
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
      pinginditva: 0,
      tobbijatekosmodal: {
        modal: false,
        tablazat: {
          adatok: []
        }
      }
    }
  },
  methods: {
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
      if (!this.indithato) {
        this.indithato=true;
        this.seedNum++;
        this.jatekosok.find(j => j.id == this.$ipfsCID).allapot = 1
        this.$room.broadcast("ready")
        if (this.jatekosok.findIndex(j => j.allapot==0) == -1) {
          this.start()
        }
      }
    },
    async ujjatek() {
      this.csatlakozasjatekhoz();
    },
    async csatlakozasjatekhoz(){
      this.jatekid = this.csatljatekazonosito || Math.floor(Math.random()*(999-100+1)+100)
      this.$room = await new this.$vueRoom(this.$ipfs, "orszagvaros-"+this.csatljatekazonosito)
      this.$room.on("peer joined", this.jatekosbelep);
      this.$room.on("message", this.uzenetfogadasa);
      this.jatekosok.push({jatekok: [], pont: 0, id: this.$ipfsCID, nev: this.nev, allapot: 0, ping: 0})
      this.$room.broadcast("announce_player_name "+this.nev)
      setInterval(this.ping, 15000);
    },
    stop() {
      this.$room.broadcast("stop")
      this.stopjatek()
    },
    stopjatek() {
      this.tablazat.uj.orszag=this.tablazat.uj.orszag.toUpperCase();
      this.tablazat.uj.varos=this.tablazat.uj.varos.toUpperCase();
      this.tablazat.uj.fiu=this.tablazat.uj.fiu.toUpperCase();
      this.tablazat.uj.lany=this.tablazat.uj.lany.toUpperCase();
      this.tablazat.uj.allat=this.tablazat.uj.allat.toUpperCase();
      this.tablazat.uj.noveny=this.tablazat.uj.noveny.toUpperCase();
      this.tablazat.uj.targy=this.tablazat.uj.targy.toUpperCase();
      this.$room.broadcast("vegallas " + JSON.stringify({...this.tablazat.uj, jatekos: this.nev}));
      this.tobbijatekosmodal.modal=true
      this.jatek=false;
      this.jatekosszavai({...this.tablazat.uj, jatekos: this.nev, id: this.$ipfsCID})
    },
    ping() {
      console.log(this.jatekosok)
      this.jatekosok.forEach(j => {
        if (j.ping < 0) {
          this.jatekoskilep(j.id)
        }
      });
      this.$room.broadcast("ping")
      this.pinginditva = performance.now()
      this.jatekosok.forEach(j => j.ping=-1);
      this.jatekosok.find(j => j.id == this.$ipfsCID).ping = 0;
    },
    jatekosbelep(cid) {
      this.$room.sendTo(cid, "announce_player_name "+this.nev)
      if (this.indithato) {
        this.$room.sendTo(cid, "ready")
        this.$room.sendTo(cid, "seed " + this.seedNum-1 )
      } else {
        this.$room.sendTo(cid, "seed " + this.seedNum )
      }

    },
    jatekoskilep(cid) {
      console.log(cid + " left")
      const leftID = this.jatekosok.findIndex(j=> j.id == cid)
      if (leftID != -1) {
        this.jatekosok.splice(leftID, 1)
      }
    },
    start(){
      const rng = new this.$rng(this.seed())
      console.log(this.seed())
      const betuk = ['A,Á','Á,A','B','C','CS','D','E,É','É,E','F','G','GY','H','I,Í','Í,I','J','K','L,LY','LY,L','M','N','NY','O,Ó','Ó,O','Ő,Ö','Ö,Ő','P','R','S','SZ','T','TY','U,Ú',"Ú,U","Ü,Ű",'Ű,Ü','V,W',"Z,ZS"]
      this.betu=betuk[Math.floor(rng() * betuk.length)]
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
      this.jatekosok.forEach(j => j.allapot=0);
    },
    uzenetfogadasa(message) {
      console.log("[" + message.from + "]: " + message.data.toString())
      if (message.from === this.$ipfsCID) 
        {return}
      const felado = message.from
      const uzenet = message.data.toString();
      const parancs = uzenet.split(" ", 1)[0];
      const adat = uzenet.split(" ").splice(1);
      if (this.jatekosok.findIndex(j => j.id == felado) == -1 && parancs != "announce_player_name") {
        this.$room.sendTo(felado, "resync_request")
        return
      }
      switch(parancs) {
        case "resync_request":
          // TODO
          break;

        case "ping":
          this.$room.sendTo(felado, "pong")
          break;

        case "pong":
          this.jatekosok.find(j => j.id == felado).ping = performance.now() - this.pinginditva
          break;

        case "announce_player_name":
          if (this.jatekosok.findIndex(j => j.id == felado) == -1) {
            this.jatekosok.push({jatekok: [], id: felado, nev: adat.join(" "), allapot: 0, pont:0, ping: 0})
          } else {
            this.jatekosok.find(j => j.id == felado).nev = adat.join(" ")
          }
          break;

        case "ready":
          this.jatekosok.find(j => j.id == felado).allapot = 1
          if (this.jatekosok.findIndex(j => j.allapot==0) == -1) {
            this.start()
          }
          break;

        case "stop":
          this.stopjatek()
          break;

        case "vegallas":
          var jatekos = JSON.parse(adat.join(" "))
          jatekos = {...jatekos, id: felado}
          this.jatekosszavai(jatekos)
          break;

        case "pont":
          this.jatekosok.find(j => j.id==felado).pont=Number(adat[0])
          this.$forceUpdate();
          break;

        case "seed":
          this.seedNum = Math.max(Number(adat[0]), this.seedNum)
          break;

      }
    },
    jatekosszavai(jatekos) {
      // TODO: A kliensek nem egyeztetik pontjaikat, hanem kiszámolják a közzétett szavakból.
      this.tobbijatekosmodal.tablazat.adatok.push(jatekos);
      this.tablazat.uj.betu.split(",").forEach(betu => {
        ["orszag", "varos", "fiu", "lany", "allat", "noveny", "targy"].forEach(entry => {
          if(this.tablazat.uj[entry].startsWith(betu)&&this.tablazat.uj[entry].length>betu.length) this.tablazat.uj.ervenyesseg[entry[0]] = true
        });
      });

      ["orszag", "varos", "fiu", "lany", "allat", "noveny", "targy"].forEach(entry => {
        this.tablazat.uj.ervenyesseg[entry[0]] = this.tobbijatekosmodal.tablazat.adatok.filter(t => t[entry] == this.tablazat.uj[entry]).length==1 && this.tablazat.uj[entry].length>0 && this.tablazat.uj.ervenyesseg[entry[0]];
      });
      this.$room.broadcast("pont " +this.osszespont());
      this.jatekosok.find(j => j.id==this.$ipfsCID).pont=this.osszespont()
    },
    seed() {
      var sum = 0
      for (var i = 0; i < this.jatekosok.length; i++){  
        for (var j = 0; j < this.jatekosok[i].id.length; j++){  
          sum += this.jatekosok[i].id.charCodeAt(j);
        }
      }
      return sum+this.seedNum
    }
  }
}
</script>
