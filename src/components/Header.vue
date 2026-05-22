<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Sun, Moon, Menu, X, User, FolderKanban, Briefcase, GraduationCap, Mail } from '@lucide/vue';
import { useTheme } from '../composables/useTheme';
import wolfSvgRaw from '/logo_wolf.svg?raw';

const { theme, toggle } = useTheme();

const isScrolled = ref(false);
const showSidebar = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('');

const navLinks = [
  { label: 'Sobre mí', href: '#about', id: 'about', icon: User },
  { label: 'Formación', href: '#education', id: 'education', icon: GraduationCap },
  { label: 'Experiencia', href: '#experience', id: 'experience', icon: Briefcase },
  { label: 'Proyectos', href: '#proyectos', id: 'proyectos', icon: FolderKanban },
  { label: 'Contacto', href: '#contact', id: 'contact', icon: Mail }
];

const handleScroll = () => {
  const scrollY = window.scrollY;
  const viewH = window.innerHeight;
  const docH = document.documentElement.scrollHeight;

  if (window.innerWidth >= 1024) {
    isScrolled.value = scrollY > 80;
    showSidebar.value = scrollY > 250;
  } else {
    isScrolled.value = false;
    showSidebar.value = false;
  }

  if (scrollY + viewH >= docH - 80) {
    activeSection.value = '#contact';
    return;
  }

  if (scrollY < 100) {
    activeSection.value = '';
    return;
  }

  const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = sections[i];
    if (el && el.offsetTop - 120 <= scrollY) {
      activeSection.value = navLinks[i].href;
      return;
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-16 z-[100] flex items-center justify-between px-6 lg:px-12 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-all duration-500"
    :class="isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'">
    <a href="#" @click.prevent="scrollToTop" aria-label="Ir al inicio" class="flex items-center cursor-pointer select-none no-underline shrink-0">
      <img src="/logo_amsot.svg" alt="AMSOT" class="h-7 w-auto dark:invert" />
    </a>

    <nav class="hidden lg:flex items-center gap-8">
      <a v-for="link in navLinks" :key="link.href" :href="link.href"
        class="relative py-2 text-[11px] uppercase tracking-[0.15em] font-bold transition-colors no-underline"
        :class="activeSection === link.href
          ? 'text-red-600 dark:text-red-500'
          : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'">
        {{ link.label }}
        <span class="absolute bottom-0 left-0 h-px bg-red-700 dark:bg-red-600 transition-all duration-300"
          :class="activeSection === link.href ? 'w-full' : 'w-0'" />
      </a>
    </nav>

    <div class="flex items-center gap-1">
      <button @click="toggle" title="Cambiar tema" aria-label="Cambiar tema" :aria-pressed="theme === 'dark'"
        class="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors bg-transparent border-0 cursor-pointer">
        <Sun v-if="theme === 'light'" :size="18" stroke-width="1.5" />
        <Moon v-else :size="18" stroke-width="1.5" />
      </button>

      <button @click="isMobileMenuOpen = !isMobileMenuOpen" :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'" :aria-expanded="isMobileMenuOpen"
        class="lg:hidden p-2 text-stone-700 dark:text-stone-300 active:scale-90 transition-transform bg-transparent border-0 cursor-pointer">
        <Menu v-if="!isMobileMenuOpen" :size="22" stroke-width="1.5" />
        <X v-else :size="22" stroke-width="1.5" />
      </button>
    </div>
  </header>

  <aside v-if="!isMobileMenuOpen"
    class="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-8 py-6 px-2.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl shadow-lg transition-all duration-700"
    :class="showSidebar ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'">
    <a href="#" @click.prevent="scrollToTop" aria-label="Ir al inicio" class="shrink-0 no-underline text-red-600 dark:text-red-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
      <span v-html="wolfSvgRaw" class="lobo-logo block w-7 h-7 [&>svg]:w-full [&>svg]:h-full" />
    </a>
    <nav class="flex flex-col gap-5">
      <a v-for="link in navLinks" :key="link.href" :href="link.href"
        class="group relative flex items-center justify-center p-1.5 rounded-md transition-colors no-underline"
        :class="activeSection === link.href
          ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/30'
          : 'text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30'">
        <component :is="link.icon" :size="17" stroke-width="1.5" />
        <span class="absolute right-full mr-4 px-2.5 py-1 bg-stone-800 text-red-400 text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none uppercase tracking-wider shadow-xl">
          {{ link.label }}
        </span>
      </a>
    </nav>
  </aside>

  <Transition name="fade">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[150] bg-white dark:bg-stone-950 flex flex-col p-8 lg:hidden">
      <div class="flex justify-between items-center mb-12">
        <span class="text-red-600 dark:text-red-500 text-sm uppercase tracking-[0.15em] font-extrabold">Navegación</span>
        <div class="flex items-center gap-3">
          <button @click="toggle"
            class="p-2 rounded-lg text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors bg-transparent border-0 cursor-pointer">
            <Sun v-if="theme === 'light'" :size="18" stroke-width="1.5" />
            <Moon v-else :size="18" stroke-width="1.5" />
          </button>
          <button @click="isMobileMenuOpen = false" class="text-stone-700 dark:text-stone-300 p-2 bg-transparent border-0 cursor-pointer">
            <X :size="24" stroke-width="1.5" />
          </button>
        </div>
      </div>
      <nav class="flex flex-col gap-4">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="isMobileMenuOpen = false"
          class="flex items-center gap-5 py-3.5 border-b text-xl font-extrabold transition-colors no-underline uppercase tracking-wider"
          :class="activeSection === link.href
            ? 'text-red-600 dark:text-red-500 border-red-200 dark:border-red-900'
            : 'text-stone-900 dark:text-stone-200 border-stone-100 dark:border-stone-800 hover:text-red-600 dark:hover:text-red-500'">
          <component :is="link.icon" :size="18" stroke-width="1.5" :class="activeSection === link.href ? 'text-red-600 dark:text-red-500' : 'text-red-600/50 dark:text-red-500/50'" />
          {{ link.label }}
        </a>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
