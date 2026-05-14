# Setup completo su nuovo PC Windows

Questa guida ti permette di configurare il progetto da zero su un nuovo PC Windows, con GitHub + Vercel + variabili ambiente.

## 1) Apri il terminale corretto

Usa Windows Terminal con PowerShell (consigliato PowerShell 7).

## 2) Installa prerequisiti (una sola volta)

Esegui questi comandi in PowerShell come Amministratore:

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id GitHub.cli -e
npm install -g vercel
```

Chiudi e riapri il terminale dopo le installazioni.

## 3) Verifica installazioni

```powershell
git --version
node -v
npm -v
gh --version
vercel --version
```

## 4) Autenticazione GitHub

### Opzione A (consigliata): GitHub CLI

```powershell
gh auth login
```

Segui il wizard:
- GitHub.com
- HTTPS
- Login via browser

### Opzione B: SSH (se preferisci)

```powershell
ssh-keygen -t ed25519 -C "la-tua-email@dominio.com"
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Copia la chiave pubblica e aggiungila in GitHub > Settings > SSH and GPG keys.

## 5) Clona il progetto

Sostituisci URL_REPO con l'URL del repository.

```powershell
cd $env:USERPROFILE\Documents\GitHub
git clone URL_REPO
cd m-tele-neuro-network
```

## 6) Installa dipendenze del progetto

```powershell
npm ci
```

Se npm ci fallisce per lockfile non allineato, usa:

```powershell
npm install
```

## 7) Collega il progetto a Vercel

```powershell
vercel login
vercel link
```

Durante vercel link seleziona:
- Team/Account corretto
- Progetto esistente corretto

## 8) Scarica le variabili ambiente

```powershell
vercel env pull .env.local
```

Questo passaggio e fondamentale: senza .env.local il progetto potrebbe non funzionare correttamente in locale.

## 9) Avvio in sviluppo

```powershell
npm run dev
```

Apri il browser su:
- http://localhost:3000

## 10) Check rapido prima di lavorare

```powershell
npm run lint
npm run build
```

## 11) Workflow Git giornaliero consigliato

```powershell
git checkout main
git pull --rebase origin main
git checkout -b feature/nome-task
```

Dopo modifiche:

```powershell
git add .
git commit -m "feat: descrizione breve"
git push -u origin feature/nome-task
```

## 12) Aggiornare il branch locale quando torni sul progetto

```powershell
cd $env:USERPROFILE\Documents\GitHub\m-tele-neuro-network
git checkout main
git pull --rebase origin main
npm ci
```

## Troubleshooting veloce

### Porta 3000 occupata

```powershell
netstat -ano | findstr :3000
taskkill /PID PID_DA_CHIUDERE /F
```

### Cache locale corrotta

```powershell
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### Verifica stato repository

```powershell
git status
git remote -v
```

## Nota importante su sicurezza

Non committare mai .env.local o altri file con segreti. Le variabili sensibili devono restare in Vercel e in locale.
