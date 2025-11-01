<template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="login-title">Welcome to TodoApp</h1>
          <p class="login-subtitle">Sign in to your account</p>
        </div>
  
        <form @submit.prevent="handleSubmit" class="login-form">
          <InputFieldAtom
            v-model="email"
            label="Email"
            place-holder="Enter your email"
            :error-message="errors.email"
            type="email"
          />
  
          <InputFieldAtom
            v-model="password"
            label="Password"
            place-holder="Enter your password"
            :error-message="errors.password"
            type="password"
          />
  
          <div v-if="authStore.error" class="error-alert">
            {{ authStore.error }}
          </div>
  
          <button 
            type="submit" 
            class="login-button"
          >
            {{ 'Sign In' }}
          </button>
  
          <div class="login-footer">
            <p class="signup-text">
              Don't have an account? 
              <a @click="showSignup = true" class="signup-link">Sign up</a>
            </p>
          </div>
        </form>
  
        <!-- Sign Up Form -->
        <form v-if="showSignup" @submit.prevent="handleSignup" class="login-form">
          <h2 class="form-title">Create Account</h2>
          
          <InputFieldAtom
            v-model="signupEmail"
            label="Email"
            place-holder="Enter your email"
            :error-message="errors.signupEmail"
            type="email"
          />
  
          <InputFieldAtom
            v-model="signupPassword"
            label="Password"
            place-holder="Create a password"
            :error-message="errors.signupPassword"
            type="password"
          />
  
          <InputFieldAtom
            v-model="confirmPassword"
            label="Confirm Password"
            place-holder="Confirm your password"
            :error-message="errors.confirmPassword"
            type="password"
          />
  
          <div v-if="authStore.error" class="error-alert">
            {{ authStore.error }}
          </div>
  
          <button 
            type="submit" 
            class="login-button"
          >
            {{ 'Sign Up' }}
          </button>
  
          <div class="login-footer">
            <p class="signup-text">
              Already have an account? 
              <a @click="showSignup = false" class="signup-link">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore'
  import InputFieldAtom from '@/components/atoms/InputFieldAtom.vue'
  import { useToast } from 'vue-toast-notification'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const toast = useToast()
  
  const email = ref('')
  const password = ref('')
  const signupEmail = ref('')
  const signupPassword = ref('')
  const confirmPassword = ref('')
  const showSignup = ref(false)
  const errors = ref<{
    email?: string
    password?: string
    signupEmail?: string
    signupPassword?: string
    confirmPassword?: string
  }>({})
  
  const validateLoginForm = () => {
    errors.value = {}
    
    if (!email.value.trim()) {
      errors.value.email = 'Email is required'
      return false
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.value.email = 'Please enter a valid email'
      return false
    }
    
    if (!password.value) {
      errors.value.password = 'Password is required'
      return false
    }
    
    if (password.value.length < 6) {
      errors.value.password = 'Password must be at least 6 characters'
      return false
    }
    
    return true
  }
  
  const validateSignupForm = () => {
    errors.value = {}
    
    if (!signupEmail.value.trim()) {
      errors.value.signupEmail = 'Email is required'
      return false
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail.value)) {
      errors.value.signupEmail = 'Please enter a valid email'
      return false
    }
    
    if (!signupPassword.value) {
      errors.value.signupPassword = 'Password is required'
      return false
    }
    
    if (signupPassword.value.length < 6) {
      errors.value.signupPassword = 'Password must be at least 6 characters'
      return false
    }
    
    if (signupPassword.value !== confirmPassword.value) {
      errors.value.confirmPassword = 'Passwords do not match'
      return false
    }
    
    return true
  }
  
  const handleSubmit = async () => {
    if (!validateLoginForm()) return
    
    authStore.clearError()
    
    const result = await authStore.signIn(email.value, password.value)
    
    if (result.success) {
      toast.success('Successfully signed in!')
      router.push('/todo')
    } else {
      toast.error(result.error || 'Failed to sign in')
    }
  }
  
  const handleSignup = async () => {
    if (!validateSignupForm()) return
    
    authStore.clearError()
    
    const result = await authStore.signUp(signupEmail.value, signupPassword.value)
    
    if (result.success) {
      toast.success('Account created successfully!')
      // Switch to sign in form
      showSignup.value = false
      email.value = signupEmail.value
      password.value = ''
      signupEmail.value = ''
      signupPassword.value = ''
      confirmPassword.value = ''
    } else {
      toast.error(result.error || 'Failed to create account')
    }
  }
  
  onMounted(() => {
    // Redirect if already authenticated
    if (authStore.isAuthenticated) {
      router.push('/todo')
    }
  })
  </script>
  
  <style scoped>
  .login-container {
    min-height: calc(100vh - var(--navbar-height));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .login-card {
    width: 100%;
    max-width: 450px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    padding: 40px;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  
  .login-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
  }
  
  .login-subtitle {
    font-size: 16px;
    color: #6b7280;
    margin: 0;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 8px 0;
    text-align: center;
  }
  
  .login-button {
    width: 100%;
    padding: 14px 20px;
    background-color: #2563eb;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  .login-button:hover:not(:disabled) {
    background-color: #1e4ed8;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  }
  
  .login-button:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  .login-button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  
  .login-footer {
    text-align: center;
    margin-top: 8px;
  }
  
  .signup-text {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
  
  .signup-link {
    color: #2563eb;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s ease;
  }
  
  .signup-link:hover {
    color: #1e4ed8;
    text-decoration: underline;
  }
  
  .error-alert {
    padding: 12px 16px;
    background-color: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    color: #dc2626;
    font-size: 14px;
    font-weight: 500;
  }
  
  @media (max-width: 640px) {
    .login-card {
      padding: 24px;
    }
    
    .login-title {
      font-size: 24px;
    }
  }
  </style>
  