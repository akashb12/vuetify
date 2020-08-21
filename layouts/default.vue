<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="this.showside == true" @click.stop="drawer = !drawer" />
      
      
      <v-toolbar-title v-text="title" />
    

      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <v-row justify="center">
    <v-dialog v-model="showAddModal" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
       
          <div class="p-4">
        <v-btn
        class="col-12 p-3"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="isSignUP=true"
        >
          Signup
        </v-btn>
        </div>
        <div class="p-4">
          <v-btn
         class="col-12 p-3"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="isSignUP=false"
        >
          Signin
        </v-btn>
        </div>
       
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
          
              <v-col cols="12">
                <v-text-field label="Phone*" v-model="addUser.phone" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" v-model="addUser.password" required></v-text-field>
              </v-col>
          
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" v-if="this.isSignUP == true" class="mr-4" @click="signUp(),showAddModal = false">Signup</v-btn>
    <v-btn color="blue darken-1" v-else @click="signIn(),showAddModal = false">Signin</v-btn>
    <v-btn color="blue darken-1" @click="showAddModal = false">Close</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
       showAddModal: false,
      showside:false,
      isSignUP:false,
      
      
      token:[],
      headers:{
       
        },
      isEdit: false,
      addUser : {password:"",phone:""},
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'places',
          to: '/inspire'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'About',
          to: '/about'
        },
         {
          icon: 'mdi-chart-bubble',
          title: 'News',
          to: '/news'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'GOA APP'
    }
  },
   methods: {
   signUp() {
   this.token=[]
      this.$axios.post("/api/users/",this.addUser,this.headers)
      .then((response) => {
       
        this.token.push(response.data)
         this.$store.commit('page/setToken',this.token)
        console.log(response.data)
        this.$router.push('menu')
     
       
        
      })
      .catch((error) => {
        console.log(error);
      });
    },
     signIn() {
    this.token=[]
      this.$axios.post("/auth/signin",this.addUser,this.headers)
      .then((response) => {
       
        this.token.push(response.data)
         this.$store.commit('page/setToken',this.token)
        console.log(response.data)
        this.showside=true;
        
     
       
        
      })
      .catch((error) => {
        console.log(error);
      });
    },
   }
}
</script>
