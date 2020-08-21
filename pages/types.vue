<template>
    <div>
 
        <v-container>
                  <v-row justify="center">
    <v-dialog v-model="showAddModal" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          ADD TYPES
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Types</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name*" v-model="addActivityType.name" @change="ConvertToSlug" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Slug" hint="example of helper text only on focus" v-model="addActivityType.slug"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="addActivityType.shortDescription"
                  label="shortDescription*"
                  
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <input class="text-black" type="file" @change="onFileSelected">
              </v-col>
             
            
              
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showAddModal = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="add()">ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
            <v-flex xs12>
                
                
            <h1>Types</h1></v-flex>
              <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
         <th class="text-left">NAME</th>
   <th class="text-left">SLUG</th>
    <th class="text-left">SHORT DESCRIPTION</th>
    <th class="text-left">GALLERY LINKED LINKED</th>
   <th class="text-left">CATEGORIES LINKED</th>
   <th class="text-left">ACTIVATE</th>
<th class="text-left">MARK FEATURED</th>
   <th class="text-left">EDIT DATA</th>
   <th class="text-left">VIEW DATA</th>
   <th class="text-left">DELETE DATA</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in activityType" :key="item._id">
         <td>{{item.name}}</td>
  <td>{{item.slug}}</td>
  <td>{{item.shortDescription}}</td>
  <td>{{item.gallery.length}}</td>
  <td>{{item.categories.length}}</td>
  
 
   <td><a v-if="item.active==false" class="btn btn-info" v-on:click="activate(item._id)">Activate</a>
<a v-else class="btn btn-info"  v-on:click="activate(datas._id)">Deactivate</a></td>
<td><a v-if="item.featured==false" class="btn btn-info" v-on:click="featured(item._id)">Mark featured</a>
<a v-else class="btn btn-info"  v-on:click="featured(item._id)">Unmark featured</a></td>
   <td><button class="btn btn-info" v-on:click="editTask(item),showAddModal=true">Edit</button></td>
   <td> <router-link :to="`/categories/${item._id}`"><button class="btn btn-info">View</button></router-link>
</td>
  <td><button class="btn btn-info" v-on:click="deleteTask(item._id)">Delete</button></td>
         
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash'
export default {
name: "Places",
data(){
    return{
      showAddModal: false,
      selectedFile:null,
      search:"",
      
      activityType:[],
      addActivityType : {id:"",name:"",slug:"",gallery:"",shortDescription:""},
     
      isEdit: false,
     headers: {
       
        headers:{
          'Content-Type': 'multipart/form-data',
          Authorization:`bearer ${JSON.parse(localStorage.getItem('token') || "{}")[0].token}`}}
      
    }
  },
   mounted() {
     this.getTypes()
     
  
 
  },
  computed: {
    filteredPosts() {
      return this.activityType.filter(datas => datas.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    
  },
    methods: {
      
    onFileSelected(event) {
       this.selectedFile=event.target.files[0]
     },
    add() {
      const fd= new FormData();
     fd.append('name', this.addActivityType.name)
      fd.append('slug', this.addActivityType.slug)
       fd.append('shortDescription', this.addActivityType.shortDescription)
       if (this.selectedFile) {
          fd.append('gallery',this.selectedFile,this.selectedFile.name)
       }
     
      
    
      this.$axios.post("/api/activityTypes/",fd,this.headers)
         
      .then((response) => {
        this.addActivityType = {name:"",slug:"",gallery:"",shortDescription:""}
        this.activityType.push(response.data)
        console.log(response.data)
        
      })
      .catch((error) => {
        console.log(error);
        
      });
      
    },
    ConvertToSlug() {
      var theSlug =this.addActivityType.name;
      theSlug =theSlug.toLowerCase();
      theSlug =theSlug.replace(/\s+/g, "-");
      this.addActivityType.slug =theSlug;
    },
     getTypes()
    {
      this.$axios.get("/api/activityTypes/")
      .then((response) => {
      console.log(response.data);
      this.activityType=response.data;
    })
    },
    editTask(data) 
    {
      this.addActivityType.id =data._id
      this.addActivityType.name=data.name
      this.addActivityType.slug=data.slug
      this.addActivityType.shortDescription=data.shortDescription
     
      
      this.isEdit=true
    },
    updateTask(){
        const fd= new FormData();
     fd.append('name', this.addActivityType.name)
      fd.append('slug', this.addActivityType.slug)
       fd.append('shortDescription', this.addActivityType.shortDescription)
       if (this.selectedFile) {
          fd.append('gallery',this.selectedFile,this.selectedFile.name)
       }
        
      this.$axios.put("/api/activityTypes/"+this.addActivityType.id,fd,this.headers)
      .then((response) => {
        this.addActivityType = {name:"",slug:"",gallery:"",shortDescription:""}
        this.getTypes()
        this.isEdit = false
        
        
        console.log(response);
      })
       .catch((error) => {
        console.log(error);
      })
        },
       
    deleteTask(id) {
         const token = JSON.parse(localStorage.getItem('token') || "{}")
      if(token){
     
           this.$axios.delete("/api/activityTypes/"+id,this.headers)
           .then((response) => {
             this.activityType =_.reject(this.activityType,function(n){
               return n._id === id;
             })
            
             
             console.log(response)
           })
           .catch((error) => {
        console.log(error);
      })
      }
  },
   activate(id){
    this.$axios.get("/api/activityTypes/activate/"+id,this.headers)
    .then((response)=>{
      this.getTypes()
      console.log(response.data);
     
    })
  },
  featured(id){
        this.$axios.get("/api/activityTypes/feature/"+id,this.headers)
    .then((response)=>{
      this.getTypes()
      console.log(response.data);
     
    })
  },
    },
       
  
};
</script>