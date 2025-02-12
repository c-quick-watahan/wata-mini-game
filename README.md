## Getting Started

First, install the dependencies:
```bash
pnpm install
```

## **Make a Branch**

When working on a project, it's important to follow a clear branching strategy. Below are the branch prefixes we use to keep everything organized:

### **Branch Naming Conventions**
- **Feature Branches:**  
  Prefix: `feature/` or `feat/`  
  Example: `feature/user-authentication`
  
- **Bug Fixes:**  
  Prefix: `bugfix/` or `fix/`  
  Example: `bugfix/fix-login-error`

- **Development Branches:**  
  Prefix: `dev/`  
  Example: `dev/integrate-new-library`

- **Chore Branches:**  
  Prefix: `chore/`  
  Example: `chore/update-dependencies`

- **Documentation Branches:**  
  Prefix: `docs/`  
  Example: `docs/update-readme`

---

### **Git Commands for Creating a Branch**

1. **Switch to the main branch** (or the branch you want to branch off from):
   ```sh
   git checkout main
   ```

2. **Pull the latest changes** to ensure your base branch is up to date:
   ```sh
   git pull origin main
   ```

3. **Create a new branch** with the appropriate prefix:
   ```sh
   git checkout -b feature/my-new-feature
   ```

4. **Switch to an existing branch**:
   ```sh
   git checkout feature/my-new-feature
   ```

---

## **Edit the env.local**
### remove `[temp]` from `temp.env.local` ###
`temp.env.local` - `temp` = `.env.local`

## **Run in dev mode!**
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More
