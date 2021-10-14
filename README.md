# oh-my-breaches

> I got 99 problems, and... well, actually they're mostly breaches

---

## What is this exactly?

This is a little app that pulls breach data from the [Have I Been Pwned](https://haveibeenpwned.com/) API. The first page is a full list of data breaches from sites that have been reported and recorded with the Have I Been Pwned service, a project by [Troy Hunt](https://www.troyhunt.com/). The other page is a place for users to search their personal information (email or phone) to see if they've been part of a data breach (that's been disclosed). Please note: This app ***does not*** record any information entered here. Not even analytics.

## Why did I make this?

Cybersecurity and online data protection is such an important part of our lives. The more the general public can be exposed to and educated about the current threats, data breaches, and other cyber vulnerabilities that can directly impact them the more likely it is that folks are willing to improve the security of their digital lives. Knowledge is the first step, and hopefully this app helps show how important it is to take cybersecurity seriously in our new digital world.

---

## Run it locally or ***[see it live](https://astrocaleb.github.io/oh-my-breaches/)***

```bash
# npm
npm ci
npm run watch  # defaults to localhost:3000
```

## What's inside

```bash
# Public - pop index.html right into a browser
dist/
├── app.bundle.js
├── favicon.ico
└── index.html
```

```bash
# Development
src/
├── index.html
├── index.js
├── app/
│   ├── App.js
│   ├── components/
│   │   ├── BreachesTable.js
│   │   ├── BreachDetails.js
│   │   └── UserLookup.js
│   └── css/
│       ├── app.css
│       ├── breaches-list.css
│       ├── breach-details.css
│       ├── user-lookup.css
│       ├── search-form.css
│       ├── spinner.css
│       └── table.css
├── images/
│   └── favicon.ico
└── tests/
    ├── setup.js
    ├── App.test.js
    ├── BreachesData.js
    ├── BreachesTable.test.js
    ├── BreachDetails.test.js
    └── UserLookup.test.js
```

---

## License

MIT
