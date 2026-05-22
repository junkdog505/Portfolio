<script setup lang="ts">
import Hero from './components/Hero.vue';
import AboutMe from './components/AboutMe.vue';
import Education from './components/Education.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Header from './components/Header.vue';
import Contact from './components/Contact.vue';
</script>

<template>
  <Header />
  <main class="w-full bg-stone-50 dark:bg-stone-950 selection:bg-red-100 dark:selection:bg-red-900/30 selection:text-red-900 dark:selection:text-red-200">
    <section class="w-full bg-gradient-to-b from-white dark:from-stone-900 to-stone-50 dark:to-stone-950">
      <Hero />
    </section>
    <div class="w-full max-w-[1300px] mx-auto px-[15px] lg:px-[30px] pb-20">
      <AboutMe />
      <Education />
      <Experience />
      <Projects />
      <Contact />
    </div>
  </main>
</template>
