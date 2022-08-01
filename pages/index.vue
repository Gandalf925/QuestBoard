<template>
  <div>
    <v-content>
      <section id="hero">
        <v-row no-gutters>
          <v-img
            :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            :src="imgSrc"
          >
            <v-theme-provider dark>
              <v-container fill-height>
                <v-row
                  align="center"
                  class="white--text mx-auto"
                  justify="center"
                >
                  <v-col class="white--text text-center" cols="12" tag="h1">
                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-1'
                          : 'display-2',
                      ]"
                      class="font-weight-light"
                    >
                      WELCOME TO
                    </span>

                    <br />

                    <span
                      :class="[
                        $vuetify.breakpoint.smAndDown
                          ? 'display-3'
                          : 'display-4',
                      ]"
                      class="font-weight-black"
                    >
                      Quest Board
                    </span>
                  </v-col>

                  <v-btn class="green" @click="login()"
                    >Connect to HandCash
                  </v-btn>
                </v-row>
              </v-container>
            </v-theme-provider>
          </v-img>
        </v-row>
      </section>

      <section id="about-site">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">What is Quest Board</h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-responsive
            class="mx-auto title font-weight-light mb-8"
            max-width="720"
          >
            Quest Board is a BSV-driven service offered by our guild to solve
            numerous difficult problems from around the world.<br />
            Adventurers receive the amount of money in BSV that was signed at
            the time of the contract by solving the requests received from the
            client. <br />All contracts are stored semi-permanently on the BSV
            blockchain and can be referenced at any time. <br />Solve more
            requests and make the world a better place!
          </v-responsive>

          <div></div>
          <v-avatar class="elevation-12 mb-12" size="128">
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-avatar>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="features" class="grey lighten-3">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">NOTES</h2>

          <v-responsive class="mx-auto mb-12" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-row>
            <v-col
              v-for="({ icon, title, text }, i) in features"
              :key="i"
              cols="12"
              md="4"
            >
              <v-card class="py-12 px-4" color="grey lighten-5" flat>
                <v-theme-provider dark>
                  <div>
                    <v-avatar color="primary" size="88">
                      <v-icon large v-text="icon"></v-icon>
                    </v-avatar>
                  </div>
                </v-theme-provider>

                <v-card-title
                  class="justify-center font-weight-black text-uppercase"
                  v-text="title"
                ></v-card-title>

                <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <div class="py-12"></div>
      </section>

      <section id="connect">
        <div class="py-12"></div>

        <v-container class="text-center">
          <h2 class="display-2 font-weight-bold mb-3">
            Let's go check the board!
          </h2>

          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>

            <v-divider></v-divider>
          </v-responsive>

          <v-btn class="green" dark @click="login()"
            >Connect to HandCash
          </v-btn>

          <div></div>
        </v-container>

        <div class="py-12"></div>
      </section>
    </v-content>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: 'lp_top',
      features: [
        {
          icon: 'mdi-currency-usd',
          title: 'Currency unit is "sats"',
          text: 'Legal tender is not used here.All payments to adventurers are made in BSV.Please note that 10% of the achievement fee will be collected by the guild and will be used for future operations.',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'Your trading partners are "people"',
          text: 'Both the person making the request and the person receiving the request are human beings, not NPCs. Please be courteous and be responsible for your work until the end.In the unlikely event that for some reason you are unable to contact either the client or the adventurer, the Guild Master will intercede on his/her authority.',
        },
        {
          icon: 'mdi-shield-outline',
          title: 'Illegal requests are prohibited.',
          text: 'All requests exchanged here will remain in the BSV blockchain semi-permanently. If criminal or similar activity is confirmed, the Guildmaster will revoke the license and delete the request since without warning by his authority. Please be aware of this.',
        },
      ],
    }
  },
  computed: {
    imgSrc() {
      return require('../assets/img/' + this.image + '.png')
    },
  },
  methods: {
    login() {
      const redirectionLoginUrl = this.$handCash.getRedirectionUrl()
      console.log(redirectionLoginUrl)
    },
  },
}
</script>

<style></style>
