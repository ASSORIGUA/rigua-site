# Photos à fournir — Présence & Autonomie

Le site est complet, sauf les photos. Chaque emplacement est déjà réservé au bon
format : les images se posent dedans sans rien décaler.

Le brief interdit les visuels de banques d'images trop reconnaissables (§10) et
demande de vraies photos de la structure, de l'équipe et des activités (§17).
Aucune image d'illustration n'a donc été mise en attendant : un emplacement vide
qui dit ce qu'il attend vaut mieux qu'une photo à retirer plus tard.

## Comment livrer une photo

1. Déposer le fichier dans `public/photos/`.
2. Dans la page concernée, ajouter `src` et `alt` au composant `<PhotoSlot>` :

```tsx
<PhotoSlot
  ratio="4/3"
  description="… (garder la description, elle documente le cadrage attendu)"
  src="/photos/salle-commune.jpg"
  alt="La salle commune, avec quatre personnes autour d'une table"
/>
```

Rien d'autre à changer. Le recadrage, le format WebP, les tailles responsives et
le chargement différé sont gérés automatiquement.

**Format attendu :** JPEG ou PNG, côté le plus long à 2000px minimum.
**L'attribut `alt` est obligatoire** : il décrit la scène pour une personne qui
ne voit pas l'image. Décrire ce qui se passe, pas « photo de la structure ».

## Liste des prises de vue

| Page | Format | Ce que la photo doit montrer |
|---|---|---|
| Accueil | paysage 4/3 | Un moment d'accompagnement en intérieur, lumière naturelle : une professionnelle et une personne âgée en conversation. Regard d'adulte à adulte, pas de blouse, pas de matériel médical visible. |
| L'association | paysage 4/3 | Un lieu de la structure, vide ou faiblement occupé : salle commune, entrée, jardin. Lumière naturelle, mobilier entretenu. Sert à montrer que le lieu existe et qu'il est soigné. **⚠️ Provisoirement remplie par une image générée par IA (`public/images/association-salle-commune.webp`), sur demande explicite. À remplacer par une vraie photo de la structure dès que possible : ce n'est pas un lieu réel.** |
| Service à domicile | paysage 4/3 | Un moment de présence au domicile : une intervenante et une personne âgée assises à une table, en conversation, dans une pièce lumineuse. Pas de blouse, pas de matériel médical visible. |
| Accueil de jour | paysage 4/3 | Une activité en petit groupe dans une salle lumineuse : quatre ou cinq personnes autour d'une table, une animatrice debout. Expressions naturelles, pas de pose. |
| Hébergement temporaire | paysage 4/3 | Une chambre claire et habitée, avec des objets personnels : ni chambre d'hôpital, ni chambre d'hôtel. Lumière naturelle, fenêtre visible. |
| Hébergement d'urgence | — | **Aucune photo, volontairement.** Le sujet est anxiogène : une image ajouterait du bruit là où la famille cherche une information et un numéro. |
| Nos actions | portrait 3/4 | Un atelier en cours, vu de côté : quatre à six personnes autour d'une table, l'animatrice parmi elles. Gestes en train de se faire, aucune pose face à l'objectif. |
| Chaque actualité | paysage 16/9 | Un moment de l'événement décrit. Optionnel : une actualité sans photo reste parfaitement lisible. |

## Ce qu'il faut éviter à la prise de vue

Repris du brief §10, et ce sont des exclusions fermes :

- images trop médicalisées, chambres d'hôpital, matériel de soin au premier plan
- personnes âgées tristes, seules ou passives
- poses artificielles, regards caméra alignés, sourires commandés
- cadrages qui montrent la dépendance de façon dévalorisante (un geste d'aide vu
  de haut, une main tendue vers quelqu'un d'assis)
- couleurs très saturées, filtres, contrastes poussés
- lumière au flash direct : la lumière naturelle est le seul éclairage à chercher

Le registre à viser : une personne adulte, dans un lieu clair, avec quelqu'un.

## Autorisations, sans exception

Aucune photo de personne reconnaissable n'est publiée sans autorisation écrite de
l'intéressé ou de son représentant légal. Cela vaut pour les personnes
accompagnées, les familles et les professionnels.

Sans autorisation, deux solutions : publier sans photo, ou cadrer de façon non
identifiante (de dos, mains seules, détail). Une autorisation peut être retirée à
tout moment, et la photo est alors retirée du site.

Prévoir un formulaire d'autorisation papier à faire signer avant la séance, pas
après.
