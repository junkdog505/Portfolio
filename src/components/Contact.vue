<script setup lang="ts">
import { ref } from 'vue';
import { Mail, Phone, Send } from '@lucide/vue';

const obfuscatedEmail = "Y3Jpcy5hbXNvdEBnbWFpbC5jb20=";
const obfuscatedPhone = "KzUxIDkyMiA1MDAgMDkx";

const revealedEmail = ref('........@....com');
const revealedPhone = ref('+51 ... ... ...');
const isRevealed = ref(false);

const revealData = () => {
  if (isRevealed.value) return;
  revealedEmail.value = atob(obfuscatedEmail);
  revealedPhone.value = atob(obfuscatedPhone);
  isRevealed.value = true;
};

const form = ref({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
});

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');

const handleSubmit = async () => {
  status.value = 'sending';
  setTimeout(() => {
    status.value = 'success';
    form.value = { nombre: '', email: '', asunto: '', mensaje: '' };
    setTimeout(() => status.value = 'idle', 5000);
  }, 1500);
};
</script>

<template>
  <section id="contact" class="py-16 space-y-10 lg:pr-14">
    <h2 class="text-lg font-bold text-stone-900 dark:text-stone-200 tracking-[0.15em] uppercase font-sans">Contacto</h2>

    <div class="grid lg:grid-cols-5 gap-10 items-start">
      <div class="lg:col-span-2 space-y-6">
        <div class="space-y-3">
          <h3 class="text-2xl font-bold text-stone-900 dark:text-stone-100">¿Tienes un proyecto en mente?</h3>
          <p class="text-stone-600 dark:text-stone-400 leading-relaxed">
            Actualmente estoy disponible para nuevos desafíos en Desarrollo Web y Ciberseguridad. Si buscas optimizar tu plataforma o proteger tu infraestructura, hablemos.
          </p>
        </div>

        <div class="space-y-4">
          <button @click="revealData"
            :class="['flex items-center gap-2.5 text-base font-mono transition-colors cursor-pointer bg-transparent border-0 p-0', isRevealed ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-500']">
            <Mail :size="16" stroke-width="1.5" />
            {{ revealedEmail }}
          </button>
          <button @click="revealData"
            :class="['flex items-center gap-2.5 text-base font-mono transition-colors cursor-pointer bg-transparent border-0 p-0', isRevealed ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400 dark:text-stone-500 hover:text-red-600 dark:hover:text-red-500']">
            <Phone :size="16" stroke-width="1.5" />
            {{ revealedPhone }}
          </button>
          <p v-if="!isRevealed" class="text-[10px] font-mono text-stone-400 dark:text-stone-500 italic">
            * Haz clic para mostrar la información de contacto.
          </p>
        </div>
      </div>

      <div class="lg:col-span-3">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div class="space-y-1.5">
              <label for="contact-nombre" class="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.1em] font-bold font-sans ml-1">Nombre</label>
              <input id="contact-nombre" v-model="form.nombre" required type="text" placeholder="Escribe tu nombre completo"
                class="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-3.5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-red-600 dark:focus:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950 transition-all text-sm" />
            </div>
            <div class="space-y-1.5">
              <label for="contact-email" class="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.1em] font-bold font-sans ml-1">Correo</label>
              <input id="contact-email" v-model="form.email" required type="email" placeholder="nombre@correo.com"
                class="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-3.5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-red-600 dark:focus:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950 transition-all text-sm" />
            </div>
          </div>
          <div class="space-y-1.5">
            <label for="contact-asunto" class="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.1em] font-bold font-sans ml-1">Asunto</label>
            <input id="contact-asunto" v-model="form.asunto" required type="text" placeholder="¿Sobre qué te gustaría hablar?"
              class="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-3.5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-red-600 dark:focus:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950 transition-all text-sm" />
          </div>
          <div class="space-y-1.5">
            <label for="contact-mensaje" class="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-[0.1em] font-bold font-sans ml-1">Mensaje</label>
            <textarea id="contact-mensaje" v-model="form.mensaje" required rows="5" placeholder="Cuéntame más sobre tu proyecto o consulta..."
              class="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-3.5 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-red-600 dark:focus:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-950 transition-all resize-none text-sm"></textarea>
          </div>
          <button type="submit" :disabled="status === 'sending' || status === 'success'"
            class="inline-flex items-center gap-2 px-8 py-3 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 shadow-md text-sm">
            <Send v-if="status === 'idle'" :size="15" stroke-width="1.5" />
            <span v-if="status === 'idle'">Enviar mensaje</span>
            <span v-else-if="status === 'sending'">Enviando...</span>
            <span v-else-if="status === 'success'">¡Mensaje enviado!</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
