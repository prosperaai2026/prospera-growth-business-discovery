# prospera-growth-business-discovery

Static, mobile-friendly Phase 1 discovery page for the PROSPERA GROWTH Business
Growth System.

Client #001:

```text
Jordan - Came to Serve Home Services
```

This page supports the first phase of the complete growth process. The answers
collected here will be used for Business Analysis, the Growth Blueprint,
Implementation, and Growth Tracking.

## Business Growth System Phases

1. Phase 1: Business Discovery
2. Phase 2: Business Analysis
3. Phase 3: Growth Blueprint
4. Phase 4: Implementation
5. Phase 5: Growth Tracking

## Files

- `index.html` - public Phase 1 discovery page and questionnaire fields.
- `styles.css` - responsive visual styling.
- `script.js` - client-side submission handling and success message.

## Email Delivery

The form posts to FormSubmit:

```text
https://formsubmit.co/prmoisescampos2014@gmail.com
```

No environment variables are required for this setup.

Important first-time setup:

1. Deploy the site and open the public form link.
2. Submit one test response.
3. FormSubmit will send a confirmation email to `prmoisescampos2014@gmail.com`.
4. Open that email and confirm the address.
5. After confirmation, new submissions will be delivered to that inbox.

## Spam Protection

The form includes:

- A hidden honeypot field that silently rejects basic bot submissions.

## Deployment

This is a static site. Deploy this client website folder to any static host
after deployment is approved.

### Netlify

1. Create a new Netlify site.
2. Drag and drop this folder into Netlify Drop, or connect the repository.
3. If connecting the repository, set the publish directory to:

```text
clients/001-Jordan-Came-to-Serve-Home-Services/website
```

4. No build command is needed.

### Vercel

1. Import the repository in Vercel.
2. Set the project root to this folder.
3. No build command is needed.

### Local Preview

From this folder, using Node.js:

```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');const root=process.cwd();const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');let file=path.join(root,url.pathname==='/'?'index.html':url.pathname);fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data);});}).listen(8080,()=>console.log('Serving http://localhost:8080'));"
```

Then open:

```text
http://localhost:8080
```

If Python is available, this also works:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```
