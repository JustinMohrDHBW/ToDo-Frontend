<template>
  <header class="navbar" aria-label="Primary">
    <div class="navbar-inner">
      <div class="navbar-left">
        <a class="navbar-logo" href="#" aria-label="Homepage">TodoApp</a>
      </div>

      <nav class="navbar-center" aria-label="Main Navigation">
        <RouterLink class="nav-link" to="/todo">Todo</RouterLink>
        <RouterLink class="nav-link" to="/done">Erledigt</RouterLink>
      </nav>

      <div class="navbar-right"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-logo {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  letter-spacing: 0.3px;
  user-select: none;
  text-decoration: none;
}

.navbar-center {
  display: flex;
  gap: 12px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  text-decoration: none;
}

.nav-link:hover {
  background: #f3f4f6;
}

.nav-link.router-link-exact-active {
  background-color: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-inner {
    flex-direction: column;
    min-height: auto;
    gap: 12px;
    padding: 12px;
  }

  .navbar-center {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>

