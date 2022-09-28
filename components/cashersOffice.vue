<template>
  <div>
    <v-row>
      <v-col cols="12" xl="4" lg="4" md="4" sm="6" xs="12">
        <v-sheet> </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog">
      <dialog-card :current-request="currentRequest"></dialog-card>
    </v-dialog>
  </div>
</template>
