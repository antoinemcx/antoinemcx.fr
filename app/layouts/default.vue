<template>
  <div class="flex flex-col w-screen h-screen max-w-5xl m-auto px-4 md:px-6 overflow-y-hidden">
    <Navbar />

    <!-- Page content -->
    <div class="flex-1 overflow-y-auto mt-10 mb-4">
      <slot />
    </div>

    <!-- TODO footer -->
  </div>
</template>
