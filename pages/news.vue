<template>
    <div>
        
        <v-container>
            <v-flex xs12>
                
                
            <h1>News</h1></v-flex>
              <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in activityType" :key="item._id">
          <td>{{ item }}</td>
         
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios';
export default {
name: "news",
data(){
    return{
      showAddModal: false,
      selectedFile:null,
      search:"",
      
      activityType:[],
      addActivityType : {id:"",name:"",slug:"",gallery:"",shortDescription:""},
     
      isEdit: false,
     
      
    }
  },
   mounted() {
     this.getTypes()
     
  
 
  },

    methods: {
      
     getTypes()
    {
      this.$axios.get("/api/activityTypes/")
      .then((response) => {
      console.log(response.data);
      this.activityType=response.data;
    })
    },
   
   
  
    },
  
};
</script>