// Fichier généré par scripts/build-icons.mjs — ne pas éditer à la main.
// Régénérer : npm run icons
//
// Jeux d'icônes embarqués :
//   - Solar — CC BY 4.0 — par 480 Design — https://creativecommons.org/licenses/by/4.0/
//
// 77 icônes, rendues en SVG inline côté serveur.

export type IconName =
  | "accessibilite"
  | "accueil"
  | "activite"
  | "adresse"
  | "agenda"
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-right-circle"
  | "arrow-right-double"
  | "arrow-up"
  | "association"
  | "atelier"
  | "autonomie"
  | "capacite"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "confidentialite"
  | "coordination"
  | "cuisine"
  | "demarche"
  | "devis"
  | "dignite"
  | "document"
  | "dot"
  | "ecoute"
  | "email"
  | "entretien"
  | "error"
  | "etoile"
  | "etoile-pleine"
  | "evaluation"
  | "evolution"
  | "famille"
  | "guillemet"
  | "hopital"
  | "horaires"
  | "info"
  | "legal"
  | "lien"
  | "lien-externe"
  | "medical-humain"
  | "menu"
  | "minus"
  | "more"
  | "nature"
  | "note"
  | "nuit"
  | "oeil"
  | "orienteur"
  | "photo"
  | "plus"
  | "question"
  | "rencontre"
  | "repit"
  | "sante"
  | "search"
  | "securite"
  | "service-domicile"
  | "service-jour"
  | "service-sejour"
  | "service-urgence"
  | "soignant"
  | "soin"
  | "soin-infirmier"
  | "sortie"
  | "spinner"
  | "success"
  | "tarifs"
  | "telephone"
  | "telephone-appel"
  | "transport"
  | "warning";

export type IconData = {
  readonly body: string;
  readonly viewBox: string;
  /** Référence d'origine, pour retrouver l'icône dans le jeu source. */
  readonly source: string;
};

export const ICONS: Readonly<Record<IconName, IconData>> = {
  "accessibilite": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\" opacity=\".5\"/><path d=\"M14 7a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z\"/><path stroke-linecap=\"round\" d=\"M18 10s-3.537 1.5-6 1.5S6 10 6 10m6 2v1.452a3 3 0 0 0 .476 1.623L15 19\"/><path stroke-linecap=\"round\" d=\"M12 12v1.452a3 3 0 0 1-.476 1.623L9 19\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:accessibility-line-duotone",
  },
  "accueil": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M12 15v3\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:home-2-line-duotone",
  },
  "activite": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2.315 12.698c-.05-.427-.075-.641-.064-.817a2 2 0 0 1 1.646-1.85c.174-.031.389-.031.82-.031h10.567c.43 0 .645 0 .819.03a2 2 0 0 1 1.646 1.85c.01.177-.014.39-.064.818l-.401 3.428A5.515 5.515 0 0 1 11.807 21H8.193a5.515 5.515 0 0 1-5.477-4.874z\"/><path d=\"M17 17h2a3 3 0 1 0 0-6h-1.5\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10 2a1.414 1.414 0 0 0 0 2a1.414 1.414 0 0 1 0 2\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m5 7.5l.116-.116c.507-.507.564-1.31.134-1.884a1.44 1.44 0 0 1 .134-1.884L5.5 3.5m9 4l.116-.116c.507-.507.564-1.31.134-1.884a1.44 1.44 0 0 1 .134-1.884L15 3.5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:tea-cup-line-duotone",
  },
  "adresse": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 10.143C4 5.646 7.582 2 12 2s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C6.553 19.812 4 14.606 4 10.144Z\" opacity=\".5\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:map-point-line-duotone",
  },
  "agenda": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M7 4V2.5M17 4V2.5M2.5 9h19\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:calendar-line-duotone",
  },
  "arrow-down": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12 4v16m0 0l6-6m-6 6l-6-6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:arrow-down-linear",
  },
  "arrow-left": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M20 12H4m0 0l6-6m-6 6l6 6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:arrow-left-linear",
  },
  "arrow-right": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M4 12h16m0 0l-6-6m6 6l-6 6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:arrow-right-linear",
  },
  "arrow-right-circle": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 12h8m0 0l-3-3m3 3l-3 3\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:round-arrow-right-linear",
  },
  "arrow-right-double": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"><path d=\"m11 19l6-7l-6-7\"/><path d=\"m7 19l6-7l-6-7\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:double-alt-arrow-right-linear",
  },
  "arrow-up": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M12 20V4m0 0l6 6m-6-6l-6 6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:arrow-up-linear",
  },
  "association": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M11.146 7.023C11.526 6.34 11.716 6 12 6s.474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.174-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.135-.399-.135s-.202.045-.399.135l-.178.082c-.691.319-1.037.477-1.267.303s-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z\" opacity=\".5\"/><path d=\"M19 9A7 7 0 1 1 5 9a7 7 0 0 1 14 0Z\"/><path stroke-linecap=\"round\" d=\"m7.351 15l-.637 2.323c-.628 2.292-.942 3.438-.523 4.065c.147.22.344.396.573.513c.652.332 1.66-.193 3.675-1.243c.67-.35 1.006-.524 1.362-.562a2 2 0 0 1 .398 0c.356.038.691.213 1.362.562c2.015 1.05 3.023 1.575 3.675 1.243c.229-.117.426-.293.573-.513c.42-.627.105-1.773-.523-4.065L16.649 15\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:medal-ribbon-star-line-duotone",
  },
  "atelier": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 6c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2s2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6v12c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.092C8.1 22 7.4 22 6 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 20.1 2 19.4 2 18z\"/><path stroke-linecap=\"round\" d=\"M7 19H5\" opacity=\".5\"/><path d=\"m13.314 4.929l-2.142 2.142c-.578.578-.867.867-1.02 1.235C10 8.673 10 9.082 10 9.9v9.656l8.97-8.97c.99-.99 1.486-1.485 1.671-2.056a2.5 2.5 0 0 0 0-1.545c-.185-.57-.68-1.066-1.67-2.056s-1.486-1.485-2.056-1.67a2.5 2.5 0 0 0-1.545 0c-.571.185-1.066.68-2.056 1.67Z\"/><path d=\"M6 22h12c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 20.1 22 19.4 22 18s0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.092C20.1 14 19.4 14 18 14h-2.5\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:palette-line-duotone",
  },
  "autonomie": {
    body: "<g fill=\"none\"><circle cx=\"12.5\" cy=\"4.5\" r=\"2.5\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"m7 22l.51-.407A7 7 0 0 0 10 17.5\" opacity=\".5\"/><path fill=\"currentColor\" d=\"m11.158 13.418l.747.074zm.813 2.841l.594-.458zm3.836 6.2a.75.75 0 1 0 1.187-.917zM10.97 10.015l-.04-.749zm2.117.116l-.107.742zm4.11 3.169l-.123-.74zm1.926.439a.75.75 0 1 0-.246-1.48zm-3.507-1.391l.712-.237zM6.25 14.5a.75.75 0 0 0 1.5 0zm4.504-4.575l-.342 3.418l1.492.15l.342-3.418zm.624 6.792l4.429 5.741l1.187-.916l-4.429-5.741zM11.5 9.25c-.178 0-.371.006-.57.017l.08 1.498q.273-.015.49-.015zm0 1.5c.454 0 .976.051 1.48.124l.214-1.485c-.54-.077-1.14-.139-1.694-.139zm5.82 3.29l1.803-.3l-.246-1.48l-1.803.3zm-4.34-3.166c.882.127 1.617.79 1.925 1.712l1.423-.474c-.46-1.382-1.613-2.504-3.134-2.723zm-2.05-1.607c-2.766.15-4.68 2.592-4.68 5.233h1.5c0-1.976 1.416-3.635 3.26-3.735zm3.975 3.319a2.17 2.17 0 0 0 2.415 1.454l-.246-1.48a.67.67 0 0 1-.746-.448zm-4.493.757c-.072.723-.14 1.283.013 1.822l1.442-.413c-.056-.198-.047-.42.037-1.26zm2.153 2.458c-.515-.668-.64-.851-.698-1.05l-1.442.414c.154.538.508.977.952 1.552z\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:walking-round-line-duotone",
  },
  "capacite": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M14 4a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z\"/><path fill=\"currentColor\" d=\"m6.048 10.849l.237-.712zm2.175.725l-.237.712zm.794 1.682l-.7-.27zM7.77 16.498l.7.269zm10.182-5.649l-.237-.712zm-2.175.725l.237.712zm-.794 1.682l.7-.27zm1.247 3.242l-.7.269zm-5.806 1.26l.651.372zM12 15l.651-.372a.75.75 0 0 0-1.302 0zm5.147-7.103l-.158-.733zm-1.898.407l.157.733zm-6.498 0l.157-.734zm-1.898-.407l-.157.733zm6.723 9.86l-.651.372zm1.462-9.409l-.152-.734zm-6.076 0l-.152.735zm6.322 3.419l.394.638zm-.466.986l.743-.102zm-6.102-.986l-.394.638zm.466.986l.743.102zM5.81 11.56l2.175.726l.474-1.423l-2.175-.726zm2.506 1.427L7.07 16.228l1.4.539l1.247-3.242zm9.398-2.85l-2.175.726l.474 1.423l2.175-.726zm-3.432 3.388l1.247 3.242l1.4-.539l-1.247-3.241zm-3.208 4.605l1.576-2.758l-1.302-.744l-1.576 2.757zM16.99 7.164l-1.897.406l.314 1.467l1.898-.407zm-8.08.406l-1.9-.406l-.314 1.466l1.898.407zm2.44 7.802l1.576 2.758l1.302-.745l-1.576-2.757zm3.743-7.802l-.206.044l.304 1.469l.216-.046zM8.594 9.037l.216.046l.304-1.47l-.206-.043zm6.293-1.423a14.25 14.25 0 0 1-5.773 0L8.81 9.083a15.75 15.75 0 0 0 6.38 0zM9.145 19.25c.798 0 1.535-.428 1.93-1.12l-1.302-.745a.72.72 0 0 1-.628.365zm6.385-2.483a.723.723 0 0 1-.675.983v1.5a2.223 2.223 0 0 0 2.075-3.022zm.01-5.904c-.222.074-.458.147-.65.265l.788 1.277c-.01.005-.002-.001.056-.023c.061-.023.143-.05.28-.096zm.143 2.124a8 8 0 0 1-.104-.277c-.02-.059-.02-.069-.018-.059l-1.486.204c.03.223.124.452.208.67zm-.793-1.859a1.75 1.75 0 0 0-.815 1.727l1.486-.204a.25.25 0 0 1 .117-.246zm3.36-1.733a.78.78 0 0 1-.535.742l.474 1.423a2.28 2.28 0 0 0 1.561-2.165zM7.07 16.228a2.223 2.223 0 0 0 2.075 3.022v-1.5a.723.723 0 0 1-.675-.983zm.916-3.942c.137.045.219.073.28.096c.058.022.065.028.056.023l.788-1.277c-.192-.118-.428-.191-.65-.265zm1.73 1.24c.085-.22.178-.448.209-.671l-1.486-.204c.001-.01.001 0-.018.059a8 8 0 0 1-.104.277zm-1.394-1.121a.25.25 0 0 1 .117.246l1.486.204a1.75 1.75 0 0 0-.815-1.727zM4.25 9.395c0 .983.629 1.855 1.56 2.165l.475-1.423a.78.78 0 0 1-.535-.742zm1.5 0c0-.498.46-.87.946-.765l.315-1.466A2.282 2.282 0 0 0 4.25 9.395zm7.175 8.735a2.22 2.22 0 0 0 1.93 1.12v-1.5c-.26 0-.5-.14-.628-.365zm6.825-8.735a2.282 2.282 0 0 0-2.76-2.231l.314 1.466a.782.782 0 0 1 .946.765z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M19.454 14.5c1.583.796 2.546 1.848 2.546 3c0 2.485-4.477 4.5-10 4.5S2 19.985 2 17.5c0-1.152.963-2.204 2.546-3\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:people-nearby-line-duotone",
  },
  "check": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2.5\" d=\"m5 12.75l4.5 4.5L19 6.75\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "chevron-down": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"m19 9l-7 6l-7-6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:alt-arrow-down-linear",
  },
  "chevron-left": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"m15 5l-6 7l6 7\"/>",
    viewBox: "0 0 24 24",
    source: "solar:alt-arrow-left-linear",
  },
  "chevron-right": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"m9 5l6 7l-6 7\"/>",
    viewBox: "0 0 24 24",
    source: "solar:alt-arrow-right-linear",
  },
  "chevron-up": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"m19 15l-7-6l-7 6\"/>",
    viewBox: "0 0 24 24",
    source: "solar:alt-arrow-up-linear",
  },
  "close": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M17.5 6.5l-11 11m0-11l11 11\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "confidentialite": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z\"/><circle cx=\"12\" cy=\"16\" r=\"2\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M6 10V8a6 6 0 1 1 12 0v2\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:lock-keyhole-line-duotone",
  },
  "coordination": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M2 5.257C2 3.458 3.567 2 5.5 2S9 3.458 9 5.257C9 7.042 7.883 9.125 6.14 9.87a1.64 1.64 0 0 1-1.28 0C3.117 9.125 2 7.042 2 5.257Zm13 12C15 15.458 16.567 14 18.5 14s3.5 1.458 3.5 3.257c0 1.785-1.117 3.868-2.86 4.613a1.64 1.64 0 0 1-1.28 0c-1.743-.745-2.86-2.828-2.86-4.613Z\"/><path fill=\"currentColor\" d=\"M12 4.25a.75.75 0 0 0 0 1.5zM12 19l.53.53a.75.75 0 0 0 0-1.06zm5.206-10.313l.402.633zM6.794 15.313l.403.632zm4.236 1.657a.75.75 0 0 0-1.06 1.06zm-1.06 3a.75.75 0 1 0 1.06 1.06zm6.162-15.72H12v1.5h4.132zM12 18.25H7.868v1.5H12zm4.803-10.195L6.392 14.68l.805 1.265L17.608 9.32zM12.53 18.47l-1.5-1.5l-1.06 1.06l1.5 1.5zm-1.06 0l-1.5 1.5l1.06 1.06l1.5-1.5zm-3.602-.22c-1.25 0-1.726-1.633-.671-2.305l-.805-1.265c-2.321 1.477-1.275 5.07 1.476 5.07zm8.264-12.5c1.25 0 1.726 1.633.671 2.305l.805 1.265c2.321-1.477 1.275-5.07-1.476-5.07z\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M18.5 17.5h.009M5.49 5.5h.01\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:routing-2-line-duotone",
  },
  "cuisine": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"M19 18h.75zM5 14.584h.75a.75.75 0 0 0-.45-.687zm14 0l-.3-.687a.75.75 0 0 0-.45.687zM15.75 7a.75.75 0 0 0 1.5 0zm-9 0a.75.75 0 0 0 1.5 0zM7 4.25A5.75 5.75 0 0 0 1.25 10h1.5A4.25 4.25 0 0 1 7 5.75zm10 1.5A4.25 4.25 0 0 1 21.25 10h1.5A5.75 5.75 0 0 0 17 4.25zm-2 15.5H9v1.5h6zm-6 0c-.964 0-1.612-.002-2.095-.067c-.461-.062-.659-.169-.789-.3l-1.06 1.062c.455.455 1.022.64 1.65.725c.606.082 1.372.08 2.294.08zM4.25 18c0 .922-.002 1.688.08 2.294c.084.628.27 1.195.725 1.65l1.061-1.06c-.13-.13-.237-.328-.3-.79c-.064-.482-.066-1.13-.066-2.094zm14 0c0 .964-.002 1.612-.067 2.095c-.062.461-.169.659-.3.789l1.062 1.06c.455-.455.64-1.022.725-1.65c.082-.606.08-1.372.08-2.294zM15 22.75c.922 0 1.688.002 2.294-.08c.628-.084 1.195-.27 1.65-.726l-1.06-1.06c-.13.13-.328.237-.79.3c-.482.064-1.13.066-2.094.066zm-8-17q.32 0 .628.046l.219-1.484A6 6 0 0 0 7 4.25zm5-4.5a5.25 5.25 0 0 0-4.973 3.563l1.42.482A3.75 3.75 0 0 1 12 2.75zM7.027 4.813A5.3 5.3 0 0 0 6.75 6.5h1.5c0-.423.07-.828.198-1.205zM17 4.25q-.431 0-.847.062l.22 1.484A4 4 0 0 1 17 5.75zm-5-1.5a3.75 3.75 0 0 1 3.552 2.545l1.42-.482A5.25 5.25 0 0 0 12 1.25zm3.552 2.545c.128.377.198.782.198 1.205h1.5c0-.589-.097-1.156-.277-1.687zM5.75 18v-3.416h-1.5V18zm-.45-4.103A4.25 4.25 0 0 1 2.75 10h-1.5a5.75 5.75 0 0 0 3.45 5.271zm12.95.687V18h1.5v-3.416zm3-4.584a4.25 4.25 0 0 1-2.55 3.897l.6 1.374A5.75 5.75 0 0 0 22.75 10zm-5.5-3.5V7h1.5v-.5zm-9 0V7h1.5v-.5z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M5 18h14\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:chef-hat-line-duotone",
  },
  "demarche": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M16 4c2.175.012 3.353.109 4.121.877C21 5.756 21 7.17 21 9.998v6c0 2.829 0 4.243-.879 5.122c-.878.878-2.293.878-5.121.878H9c-2.828 0-4.243 0-5.121-.878C3 20.24 3 18.827 3 15.998v-6c0-2.828 0-4.242.879-5.121C4.647 4.109 5.825 4.012 8 4\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9 13.4l1.714 1.6L15 11\"/><path d=\"M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:clipboard-check-line-duotone",
  },
  "devis": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M7 14.5h8\"/><path stroke-linecap=\"round\" d=\"M7 18h5.5\" opacity=\".5\"/><path d=\"M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:clipboard-text-line-duotone",
  },
  "dignite": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"m8.962 19.379l-.473.582zM12 5.574l-.548.512a.75.75 0 0 0 1.096 0zm3.038 13.805l.473.582zM12 21v-.75zm-2.566-2.204c-1.45-1.176-3.142-2.719-4.466-4.408c-1.339-1.707-2.218-3.46-2.218-5.07h-1.5c0 2.117 1.13 4.202 2.537 5.996c1.422 1.813 3.21 3.436 4.702 4.647zM2.75 9.318c0-2.905 1.268-4.7 2.836-5.315c1.565-.613 3.754-.175 5.866 2.083l1.096-1.024c-2.388-2.554-5.199-3.36-7.509-2.456C2.732 3.51 1.25 5.992 1.25 9.318zM15.51 19.96c1.493-1.211 3.281-2.834 4.703-4.647c1.407-1.794 2.537-3.879 2.537-5.997h-1.5c0 1.612-.88 3.364-2.218 5.071c-1.324 1.689-3.016 3.232-4.466 4.408zm7.24-10.644c0-3.325-1.482-5.807-3.79-6.71c-2.31-.905-5.12-.1-7.508 2.455l1.096 1.024c2.112-2.258 4.301-2.696 5.866-2.083c1.568.614 2.836 2.41 2.836 5.314zM8.49 19.961c1.27 1.032 2.152 1.789 3.51 1.789v-1.5c-.723 0-1.173-.324-2.566-1.454zm6.076-1.165c-1.393 1.13-1.843 1.454-2.566 1.454v1.5c1.358 0 2.24-.757 3.51-1.789z\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M18.5 9h-2m0 0h-2m2 0V7m0 2v2\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:health-line-duotone",
  },
  "document": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M8 12h8M8 8h8m-8 8h5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:document-text-line-duotone",
  },
  "dot": {
    body: "<circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"currentColor\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "ecoute": {
    body: "<g fill=\"none\" stroke=\"currentColor\"><path stroke-width=\"1.5\" d=\"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.6.376 3.112 1.043 4.453c.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 0 0 1.591 1.592l2.226-.596a1.63 1.63 0 0 1 1.149.133A9.96 9.96 0 0 0 12 22Z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M8 12h.009m3.982 0H12m3.991 0H16\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:chat-round-dots-line-duotone",
  },
  "email": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"m6 8l2.159 1.8c1.837 1.53 2.755 2.295 3.841 2.295s2.005-.765 3.841-2.296L18 8\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:letter-line-duotone",
  },
  "entretien": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M6 22v-1m12 1v-1\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v3c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M3 9h18\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M15 15a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M6.5 5.5h3\"/><path fill=\"currentColor\" d=\"M15.5 5.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 0a1 1 0 1 1-2 0a1 1 0 0 1 2 0\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:washing-machine-line-duotone",
  },
  "error": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"m14.5 9.5l-5 5m0-5l5 5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:close-circle-line-duotone",
  },
  "etoile": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M17.26 6.34c.567.164.764 1.01 1.157 2.702l.102.437c.112.481.168.722.302.908s.33.299.723.522l.357.204c1.383.788 2.074 1.181 2.098 1.842c.025.66-.634 1.15-1.952 2.128l-.34.254c-.375.278-.562.417-.682.622c-.12.204-.157.451-.233.945l-.07.45a9 9 0 0 1-.33 1.401c-.197.617-.296.926-.654 1.132s-.706.105-1.4-.096M10.44 6.728l.102.437c.111.481.167.721.301.908s.33.299.723.522l.358.204c1.382.787 2.074 1.181 2.098 1.841s-.635 1.15-1.953 2.13l-.34.253c-.375.278-.562.417-.681.622c-.12.204-.158.451-.234.945l-.07.45c-.267 1.739-.4 2.608-.952 2.852c0 0-1.156-.3-2.364-1.386l-.312-.282c-.344-.308-.515-.463-.723-.523s-.427-.02-.867.062l-.4.075c-1.549.287-2.323.43-2.688-.08c-.365-.509-.08-1.334.492-2.985l.148-.427c.162-.469.243-.703.234-.945s-.107-.464-.302-.908l-.179-.404c-.688-1.56-1.033-2.341-.707-2.9s1.106-.525 2.667-.459l.404.017c.444.02.665.029.867-.06c.203-.09.362-.268.68-.624l.291-.324c1.122-1.252 1.683-1.878 2.25-1.713c.566.164.763 1.01 1.157 2.702Z\"/><path d=\"m11.924 8.799l7.62 2.11m-9.752 6.982l6.547 1.9m-5.291-6.147l7.977 2.314M9.283 4.025l7.978 2.315\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:star-angle-line-duotone",
  },
  "etoile-pleine": {
    body: "<path fill=\"currentColor\" d=\"M9.153 5.408C10.42 3.136 11.053 2 12 2s1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182s.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506s-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452s-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882S3.58 8.328 6.04 7.772l.636-.144c.699-.158 1.048-.237 1.329-.45s.46-.536.82-1.182z\"/>",
    viewBox: "0 0 24 24",
    source: "solar:star-bold",
  },
  "evaluation": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path stroke-linejoin=\"round\" d=\"M2 5.5L3.214 7L7.5 3\"/><path stroke-linejoin=\"round\" d=\"M2 12.5L3.214 14L7.5 10\" opacity=\".5\"/><path stroke-linejoin=\"round\" d=\"M2 19.5L3.214 21L7.5 17\"/><path d=\"M22 19H12\"/><path d=\"M22 12H12\" opacity=\".5\"/><path d=\"M22 5H12\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:checklist-line-duotone",
  },
  "evolution": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"M7.378 11.63h-.75zm0 .926l-.562.497a.75.75 0 0 0 1.08.044zm2.141-1.015a.75.75 0 0 0-1.038-1.082zm-2.958-1.038a.75.75 0 1 0-1.122.994zm8.37-1.494a.75.75 0 1 0 1.102-1.018zM12.045 6.25c-2.986 0-5.416 2.403-5.416 5.38h1.5c0-2.137 1.747-3.88 3.916-3.88zm-5.416 5.38v.926h1.5v-.926zm1.269 1.467l1.622-1.556l-1.038-1.082l-1.622 1.555zm.042-1.039l-1.378-1.555l-1.122.994l1.377 1.556zm8.094-4.067a5.42 5.42 0 0 0-3.99-1.741v1.5a3.92 3.92 0 0 1 2.889 1.26zm.585 3.453l.56-.498a.75.75 0 0 0-1.08-.043zm-2.139 1.014a.75.75 0 1 0 1.04 1.082zm2.96 1.04a.75.75 0 0 0 1.12-.997zm-8.393 1.507a.75.75 0 0 0-1.094 1.026zm2.888 2.745c2.993 0 5.434-2.4 5.434-5.38h-1.5c0 2.135-1.753 3.88-3.934 3.88zm5.434-5.38v-.926h-1.5v.926zm-1.27-1.467l-1.619 1.555l1.04 1.082l1.618-1.555zm-.04 1.04l1.38 1.554l1.122-.996l-1.381-1.555zM7.952 16.03a5.45 5.45 0 0 0 3.982 1.719v-1.5c-1.143 0-2.17-.48-2.888-1.245z\"/><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:refresh-circle-line-duotone",
  },
  "famille": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"6\" r=\"4\"/><path stroke-linecap=\"round\" d=\"M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4\" opacity=\".5\"/><ellipse cx=\"12\" cy=\"17\" rx=\"6\" ry=\"4\"/><path stroke-linecap=\"round\" d=\"M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:users-group-two-rounded-line-duotone",
  },
  "guillemet": {
    body: "<path fill=\"currentColor\" d=\"M3 12.5C3 8.36 5.69 5.1 9.86 4l.9 2.06C7.94 6.9 6.4 8.6 6.1 11H9.5a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9.5 18h-5A1.5 1.5 0 0 1 3 16.5zm10.5 0c0-4.14 2.69-7.4 6.86-8.5l.9 2.06c-2.82.84-4.36 2.54-4.66 4.94H20a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5z\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "hopital": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" d=\"M22 22H2\"/><path d=\"M17 22V6c0-1.886 0-2.828-.586-3.414S14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586S7 4.114 7 6v16\"/><path d=\"M21 22V8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552C19.607 5 18.904 5 17.5 5M3 22V8.5c0-1.404 0-2.107.337-2.611a2 2 0 0 1 .552-.552C4.393 5 5.096 5 6.5 5\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M12 22v-3\"/><path stroke-linecap=\"round\" d=\"M10 12h4m-8.5-1H7m-1.5 3H7m10-3h1.5M17 14h1.5m-13-6H7m10 0h1.5M10 15h4\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9V5m2 2h-4\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:hospital-line-duotone",
  },
  "horaires": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 8v4l2.5 2.5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:clock-circle-line-duotone",
  },
  "info": {
    body: "<g fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M12 17v-6\"/><circle cx=\"1\" cy=\"1\" r=\"1\" fill=\"currentColor\" transform=\"matrix(1 0 0 -1 11 9)\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:info-circle-line-duotone",
  },
  "legal": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 10c0-3.771 0-5.657 1.172-6.828S7.229 2 11 2h2c3.771 0 5.657 0 6.828 1.172S21 6.229 21 10v4c0 3.771 0 5.657-1.172 6.828S16.771 22 13 22h-2c-3.771 0-5.657 0-6.828-1.172S3 17.771 3 14z\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M8 12h8M8 8h8m-8 8h5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:document-text-line-duotone",
  },
  "lien": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"m12 5.501l2 2\" opacity=\".5\"/><path fill=\"currentColor\" d=\"m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043s-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:heart-angle-line-duotone",
  },
  "lien-externe": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6 18L18 6m0 0H9m9 0v9\"/>",
    viewBox: "0 0 24 24",
    source: "solar:arrow-right-up-linear",
  },
  "medical-humain": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M18 12h-.801c-.83 0-1.245 0-1.589.195c-.344.194-.557.55-.984 1.261l-.03.052c-.398.663-.597.994-.886.989s-.476-.344-.849-1.022l-1.687-3.067c-.347-.632-.52-.948-.798-.963c-.277-.015-.484.28-.897.87l-.283.405c-.44.627-.659.94-.984 1.11c-.326.17-.709.17-1.474.17H6\"/><path fill=\"currentColor\" d=\"m8.962 19.37l.474-.58zM12 5.5l-.55.51a.75.75 0 0 0 1.1 0zm3.038 13.872l.474.581zm-5.602-.581c-1.45-1.183-3.143-2.733-4.467-4.43c-1.339-1.715-2.219-3.478-2.219-5.1h-1.5c0 2.126 1.13 4.22 2.536 6.023c1.421 1.82 3.21 3.452 4.702 4.669zM2.75 9.26c0-2.73 1.258-4.555 2.85-5.218c1.573-.654 3.753-.287 5.85 1.968l1.1-1.022c-2.403-2.581-5.223-3.289-7.526-2.331c-2.282.95-3.774 3.422-3.774 6.603zm12.762 10.692c1.493-1.217 3.28-2.848 4.702-4.67c1.407-1.803 2.536-3.896 2.536-6.022h-1.5c0 1.622-.88 3.385-2.219 5.1c-1.324 1.697-3.017 3.247-4.467 4.43zM22.75 9.26c0-3.18-1.492-5.654-3.774-6.603c-2.303-.958-5.123-.25-7.525 2.33l1.098 1.023c2.098-2.255 4.278-2.622 5.85-1.968c1.593.662 2.851 2.488 2.851 5.218zM8.488 19.952C9.758 20.988 10.64 21.75 12 21.75v-1.5c-.722 0-1.171-.325-2.564-1.46zm6.076-1.163C13.171 19.926 12.722 20.25 12 20.25v1.5c1.359 0 2.241-.762 3.512-1.798z\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:heart-pulse-line-duotone",
  },
  "menu": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M20 7H4m16 5H4m16 5H4\"/>",
    viewBox: "0 0 24 24",
    source: "solar:hamburger-menu-linear",
  },
  "minus": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2.5\" d=\"M6 12h12\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "more": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"5\" cy=\"12\" r=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/><circle cx=\"19\" cy=\"12\" r=\"2\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:menu-dots-linear",
  },
  "nature": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"m12 9l4.5-4.5m-4.5 10L18.5 8M12 19.5l7.5-7.5\" opacity=\".5\"/><path d=\"M12 22c4.418 0 8-3.646 8-8.143c0-4.462-2.553-9.67-6.537-11.531A3.45 3.45 0 0 0 12 2m0 20c-4.418 0-8-3.646-8-8.143c0-4.462 2.553-9.67 6.537-11.531A3.45 3.45 0 0 1 12 2m0 20V2\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:leaf-line-duotone",
  },
  "note": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"m20.082 3.018l.026.75zm-3.582.47l-.215-.719zm-2.826 1.315l-.376-.65zM3.982 3.075l-.046.749zM7 3.488l.191-.726zm3.282 1.388l-.35.663zm3.346 15.193l.352.662zM17 18.634l-.191-.726zm2.985-.411l.047.749zm-9.613 1.846l-.352.662zM7 18.634l.191-.726zm-2.985-.411l-.047.749zm-1.265-2.08V4.999h-1.5v11.146zm20 0V4.934h-1.5v11.21zM20.056 2.269c-1.139.04-2.626.158-3.771.501l.43 1.437c.95-.284 2.274-.4 3.393-.439zm-3.771.501c-.995.298-2.114.88-2.987 1.385l.752 1.298c.85-.492 1.845-1 2.665-1.246zM3.936 3.824c.966.059 2.06.174 2.873.389l.382-1.45c-.96-.254-2.176-.376-3.163-.437zm2.873.389c.962.254 2.146.81 3.123 1.326l.7-1.326c-.995-.527-2.304-1.15-3.44-1.45zM13.98 20.73c.991-.528 2.219-1.11 3.211-1.372l-.382-1.45c-1.17.308-2.526.961-3.534 1.499zm3.211-1.372c.803-.212 1.882-.328 2.841-.388l-.094-1.497c-.98.062-2.179.183-3.13.434zm-6.466.048c-1.008-.537-2.363-1.19-3.534-1.499l-.382 1.45c.992.263 2.22.845 3.21 1.373zm-3.534-1.499c-.95-.25-2.15-.372-3.13-.434l-.093 1.497c.959.06 2.038.176 2.84.388zm14.059-1.764c0 .686-.568 1.284-1.312 1.33l.094 1.497c1.474-.092 2.718-1.291 2.718-2.827zm1.5-11.21c0-1.464-1.165-2.719-2.694-2.666l.052 1.5c.615-.022 1.142.484 1.142 1.165zm-21.5 11.21c0 1.536 1.244 2.735 2.718 2.828l.094-1.498c-.744-.046-1.312-.645-1.312-1.33zm12.025 3.264a2.72 2.72 0 0 1-2.55 0l-.705 1.323a4.22 4.22 0 0 0 3.96 0zm.023-15.254a2.77 2.77 0 0 1-2.665.059l-.701 1.326a4.27 4.27 0 0 0 4.118-.087zM2.75 4.998c0-.697.552-1.213 1.186-1.174l.092-1.498C2.47 2.231 1.25 3.5 1.25 4.998z\"/><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M12 5.5v15\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:notebook-minimalistic-line-duotone",
  },
  "nuit": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M13.5 8h3l-3 3h3M18 2h4l-4 4h4\"/><path fill=\"currentColor\" d=\"m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75zM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.75 5.75 0 0 1 15.5 14.25v1.5a7.25 7.25 0 0 0 6.21-3.505zM9.75 8.5a5.75 5.75 0 0 1 2.781-4.925l-.776-1.284A7.25 7.25 0 0 0 8.25 8.5zM12 2.75a.38.38 0 0 1-.268-.118a.3.3 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.3.3 0 0 1-.155-.082a.38.38 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606z\" opacity=\".4\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:moon-sleep-line-duotone",
  },
  "oeil": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z\"/><path d=\"M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:eye-linear",
  },
  "orienteur": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M6.704 3.5H17.5c1.404 0 2.107 0 2.611.337a2 2 0 0 1 .552.552C21 4.893 21 5.596 21 7s0 2.107-.337 2.611a2 2 0 0 1-.552.552c-.504.337-1.207.337-2.611.337H6.704c-.658 0-.986 0-1.288-.098a2 2 0 0 1-.383-.17c-.274-.16-.494-.404-.933-.894c-.85-.947-1.276-1.42-1.379-1.974a2 2 0 0 1 0-.728c.103-.553.528-1.027 1.379-1.974c.44-.49.659-.734.933-.893a2 2 0 0 1 .383-.17c.302-.099.63-.099 1.288-.099Zm10.592 9H6.5c-1.404 0-2.107 0-2.611.337a2 2 0 0 0-.552.552C3 13.893 3 14.596 3 16s0 2.107.337 2.611a2 2 0 0 0 .552.552c.504.337 1.207.337 2.611.337h10.796c.658 0 .986 0 1.288-.098q.2-.066.383-.17c.274-.16.494-.404.933-.894c.85-.947 1.276-1.42 1.379-1.974a2 2 0 0 0 0-.728c-.103-.553-.528-1.027-1.379-1.974c-.44-.49-.659-.734-.933-.893a2 2 0 0 0-.383-.17c-.302-.099-.63-.099-1.288-.099Z\"/><path fill=\"currentColor\" d=\"M12.75 2a.75.75 0 0 0-1.5 0zm0 9a.75.75 0 0 0-1.5 0zm0 9a.75.75 0 0 0-1.5 0zM14 22.75a.75.75 0 0 0 0-1.5zm-4-1.5a.75.75 0 0 0 0 1.5zM11.25 2v1h1.5V2zm0 9v1h1.5v-1zm0 9v2h1.5v-2zM14 21.25h-4v1.5h4z\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:signpost-line-duotone",
  },
  "photo": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z\"/><circle cx=\"16\" cy=\"8\" r=\"2\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"m2 12.5l1.752-1.533a2.3 2.3 0 0 1 3.14.105l4.29 4.29a2 2 0 0 0 2.564.222l.299-.21a3 3 0 0 1 3.731.225L21 18.5\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:gallery-line-duotone",
  },
  "plus": {
    body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2.5\" d=\"M12 6v12M6 12h12\"/>",
    viewBox: "0 0 24 24",
    source: "pa (maison)",
  },
  "question": {
    body: "<g fill=\"none\"><circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"1.5\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M10.125 8.875a1.875 1.875 0 1 1 2.828 1.615c-.475.281-.953.708-.953 1.26V13\"/><circle cx=\"12\" cy=\"16\" r=\"1\" fill=\"currentColor\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:question-circle-line-duotone",
  },
  "rencontre": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"9\" cy=\"6\" r=\"4\"/><path d=\"M12.5 4.341a3 3 0 1 1 0 3.318\" opacity=\".5\"/><ellipse cx=\"9\" cy=\"17\" rx=\"7\" ry=\"4\"/><path stroke-linecap=\"round\" d=\"M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:users-group-rounded-line-duotone",
  },
  "repit": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linejoin=\"round\" d=\"M6.821 21H17.18c.995 0 1.494 0 1.906-.1c1.404-.342 2.5-1.512 2.821-3.01c.094-.44.094-.97.094-2.033v-4.611C22 10.006 21.057 9 19.895 9c-1.163 0-2.105 1.005-2.105 2.246v5.087H6.21v-5.087C6.21 10.006 5.269 9 4.106 9S2 10.005 2 11.246v4.611c0 1.063 0 1.594.094 2.033c.32 1.498 1.417 2.668 2.822 3.01c.411.1.91.1 1.905.1Z\"/><path d=\"M6 10V8.154c0-2.3 0-3.451.482-4.308A3.65 3.65 0 0 1 7.8 2.495C8.635 2 9.757 2 12 2s3.365 0 4.2.495c.547.324 1.002.79 1.318 1.351C18 4.703 18 5.853 18 8.154V10\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M19.5 22v-1m-15 1v-1\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:armchair-line-duotone",
  },
  "sante": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M9 14.235V17a5 5 0 0 0 5 5h.882a4.12 4.12 0 0 0 3.964-3\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M5.429 3h-.092c-.313 0-.47 0-.601.012a3 3 0 0 0-2.724 2.724C2 5.868 2 6.024 2 6.336v.9a7 7 0 0 0 7 7a6.714 6.714 0 0 0 6.714-6.715V6.337c0-.313 0-.47-.011-.601a3 3 0 0 0-2.724-2.724C12.847 3 12.69 3 12.377 3h-.091\"/><circle cx=\"19\" cy=\"16\" r=\"3\"/><path stroke-linecap=\"round\" d=\"M12 2v2M6 2v2\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:stethoscope-line-duotone",
  },
  "search": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"11.5\" cy=\"11.5\" r=\"9.5\"/><path stroke-linecap=\"round\" d=\"M18.5 18.5L22 22\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:magnifer-linear",
  },
  "securite": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 10.417c0-3.198 0-4.797.378-5.335c.377-.537 1.88-1.052 4.887-2.081l.573-.196C10.405 2.268 11.188 2 12 2s1.595.268 3.162.805l.573.196c3.007 1.029 4.51 1.544 4.887 2.081C21 5.62 21 7.22 21 10.417v1.574c0 5.638-4.239 8.375-6.899 9.536C13.38 21.842 13.02 22 12 22s-1.38-.158-2.101-.473C7.239 20.365 3 17.63 3 11.991z\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m9.5 12.4l1.429 1.6l3.571-4\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:shield-check-line-duotone",
  },
  "service-domicile": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z\"/><path stroke-linecap=\"round\" d=\"M9 16c.85.63 1.885 1 3 1s2.15-.37 3-1\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:home-smile-linear",
  },
  "service-jour": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"6\"/><path stroke-linecap=\"round\" d=\"M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:sun-linear",
  },
  "service-sejour": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" d=\"M19 20v-1.5M5 20v-1.5\"/><path d=\"M2 15c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C3.602 12 4.068 12 5 12h14c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C22 13.602 22 14.068 22 15s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C20.398 18 19.932 18 19 18H5c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 16.398 2 15.932 2 15Zm19-3c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12\"/><path d=\"M18.5 12v-1.5c0-1.886 0-2.828-.586-3.414S16.386 6.5 14.5 6.5h-5c-1.886 0-2.828 0-3.414.586S5.5 8.614 5.5 10.5V12M12 7v5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:bed-linear",
  },
  "service-urgence": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M20 22v-6a8 8 0 1 0-16 0v6\"/><path stroke-linecap=\"round\" d=\"M14.29 11.5a4 4 0 0 1 2.21 2.21M2 22h20M12 2v3m9 1l-1.5 1.5M3 6l1.5 1.5\"/><path d=\"M13.5 17.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z\"/><path stroke-linecap=\"round\" d=\"M12 19v3\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:siren-rounded-linear",
  },
  "soignant": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M2 14c0-3.771 0-5.657 1.172-6.828S6.229 6 10 6h4c3.771 0 5.657 0 6.828 1.172S22 10.229 22 14s0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14Z\"/><path d=\"M16 6c0-1.886 0-2.828-.586-3.414S13.886 2 12 2s-2.828 0-3.414.586S8 4.114 8 6\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M13.5 14h-3m1.5-1.5v3\"/><circle cx=\"12\" cy=\"14\" r=\"4\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:medical-kit-line-duotone",
  },
  "soin": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"m10.15 8.802l-.442.606zM12 3.106l-.508.552a.75.75 0 0 0 1.015 0zm1.85 5.696l.442.606zM12 9.676v.75zm-1.408-1.48c-.69-.503-1.427-1.115-1.983-1.76c-.574-.665-.859-1.254-.859-1.721h-1.5c0 1.017.578 1.954 1.223 2.701c.663.768 1.501 1.457 2.235 1.992zM7.75 4.715c0-1.059.52-1.663 1.146-1.873c.652-.22 1.624-.078 2.596.816l1.015-1.104C11.23 1.38 9.704.988 8.418 1.42C7.105 1.862 6.25 3.096 6.25 4.715zm6.542 4.693c.734-.534 1.572-1.224 2.235-1.992c.645-.747 1.223-1.684 1.223-2.701h-1.5c0 .467-.284 1.056-.859 1.721c-.556.645-1.292 1.257-1.982 1.76zm3.458-4.693c0-1.619-.855-2.853-2.167-3.295c-1.286-.432-2.813-.04-4.09 1.134l1.015 1.104c.972-.894 1.945-1.036 2.597-.816c.625.21 1.145.814 1.145 1.873zM9.708 9.408c.755.55 1.354 1.018 2.292 1.018v-1.5c-.365 0-.565-.115-1.408-.73zm3.7-1.212c-.843.615-1.043.73-1.408.73v1.5c.938 0 1.537-.467 2.292-1.018z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M4 21.388h2.26c1.01 0 2.033.106 3.016.308a14.9 14.9 0 0 0 5.33.118c.868-.14 1.72-.355 2.492-.727c.696-.337 1.549-.81 2.122-1.341c.572-.53 1.168-1.397 1.59-2.075c.364-.582.188-1.295-.386-1.728a1.89 1.89 0 0 0-2.22 0l-1.807 1.365c-.7.53-1.465 1.017-2.376 1.162q-.165.026-.345.047m0 0l-.11.012m.11-.012a1 1 0 0 0 .427-.24a1.49 1.49 0 0 0 .126-2.134a1.9 1.9 0 0 0-.45-.367c-2.797-1.669-7.15-.398-9.779 1.467m9.676 1.274a.5.5 0 0 1-.11.012m0 0a9.3 9.3 0 0 1-1.814.004\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:hand-heart-line-duotone",
  },
  "soin-infirmier": {
    body: "<g fill=\"none\"><path fill=\"currentColor\" d=\"m6.182 10.546l.53.53zm7.273 7.272l.53.53zm4.283-8.808l-.53.53zm1.286 1.56l.705-.257zm-1.286 2.965l-.53-.53zm1.286-1.559l.705.257zM14.99 6.263l.53-.53zm-1.559-1.287l-.256.705zm-2.966 1.287l.53.53zm1.559-1.287l.256.705zM19.47 7.44a.75.75 0 1 0 1.06-1.06zm-1.85-3.97a.75.75 0 1 0-1.06 1.061zm-3.16 3.324l2.747 2.747l1.06-1.06l-2.747-2.748zm2.747 6.212l-4.283 4.283l1.061 1.06l4.283-4.282zm-10.495-1.93l4.283-4.282l-1.06-1.06l-4.283 4.282zm0 6.213a4.393 4.393 0 0 1 0-6.212l-1.06-1.06a5.893 5.893 0 0 0 0 8.333zm6.212 0a4.393 4.393 0 0 1-6.212 0l-1.06 1.06a5.893 5.893 0 0 0 8.333 0zm4.283-7.748c.385.385.644.645.83.86c.18.21.248.332.282.426l1.41-.513c-.122-.335-.32-.616-.555-.89c-.23-.269-.537-.574-.906-.943zm1.06 4.526c.37-.37.676-.675.907-.943c.236-.275.433-.555.555-.89l-1.41-.513c-.034.094-.103.216-.283.425c-.185.216-.444.475-.829.86zm.052-3.24c.105.288.105.605 0 .894l1.41.513c.226-.62.226-1.3 0-1.92zM15.52 5.732c-.368-.368-.674-.675-.943-.906c-.274-.235-.555-.433-.89-.555l-.512 1.41c.093.034.215.103.425.283c.215.185.475.444.86.829zm-4.525 1.061a18 18 0 0 1 .86-.829c.21-.18.332-.249.425-.283l-.513-1.41c-.334.122-.615.32-.89.555c-.268.231-.574.538-.942.906zm2.693-2.522a2.8 2.8 0 0 0-1.92 0l.512 1.41a1.3 1.3 0 0 1 .895 0zm4.327 1.714l1.455 1.454l1.06-1.06l-1.454-1.455zm1.061-1.06L17.621 3.47l-1.06 1.06l1.454 1.455z\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M17.091 14.182L9.818 6.909\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M6.182 17.818L4 20\" opacity=\".5\"/><path fill=\"currentColor\" d=\"M15.833 7.106a.75.75 0 0 0 1.06 1.06zm3.242-1.121a.75.75 0 0 0-1.06-1.06zm-2.181 2.182l2.181-2.182l-1.06-1.06l-2.182 2.181zm-2.515 8.727a.75.75 0 0 0 1.06-1.06zm-1.825-3.946a.75.75 0 1 0-1.06 1.06zm.189 5.583a.75.75 0 1 0 1.06-1.061zm-.586-2.707a.75.75 0 0 0-1.06 1.06zm3.283.01l-2.886-2.886l-1.06 1.06l2.885 2.886zm-1.637 1.636l-1.646-1.646l-1.06 1.06l1.646 1.647z\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:syringe-line-duotone",
  },
  "sortie": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M3 8.71c0-1.474 0-2.21.393-2.64a1.5 1.5 0 0 1 .497-.36c.532-.236 1.231-.003 2.629.463c1.067.356 1.6.534 2.14.515a3 3 0 0 0 .588-.078c.525-.125.993-.437 1.929-1.06l1.382-.922c1.2-.8 1.799-1.2 2.487-1.291c.688-.093 1.372.135 2.739.591l1.165.388c.99.33 1.485.495 1.768.888S21 6.12 21 7.162v8.129c0 1.473 0 2.21-.393 2.64a1.5 1.5 0 0 1-.497.358c-.532.237-1.231.004-2.629-.462c-1.067-.356-1.6-.534-2.14-.515a3 3 0 0 0-.588.078c-.525.125-.993.437-1.929 1.06l-1.382.922c-1.2.8-1.799 1.2-2.487 1.291c-.688.093-1.372-.135-2.739-.591l-1.165-.388c-.99-.33-1.485-.495-1.768-.888S3 17.88 3 16.838z\"/><path d=\"M9 6.639V20.5M15 3v14\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:map-line-duotone",
  },
  "spinner": {
    body: "<path fill=\"currentColor\" d=\"M3.68 11.333h-.75zm0 1.667l-.528.532a.75.75 0 0 0 1.056 0zm2.208-1.134A.75.75 0 1 0 4.83 10.8zM2.528 10.8a.75.75 0 0 0-1.056 1.065zm16.088-3.408a.75.75 0 1 0 1.277-.786zM12.079 2.25c-5.047 0-9.15 4.061-9.15 9.083h1.5c0-4.182 3.42-7.583 7.65-7.583zm-9.15 9.083V13h1.5v-1.667zm1.28 2.2l1.679-1.667L4.83 10.8l-1.68 1.667zm0-1.065L2.528 10.8l-1.057 1.065l1.68 1.666zm15.684-5.86A9.16 9.16 0 0 0 12.08 2.25v1.5a7.66 7.66 0 0 1 6.537 3.643zM20.314 11l.527-.533a.75.75 0 0 0-1.054 0zM18.1 12.133a.75.75 0 0 0 1.055 1.067zm3.373 1.067a.75.75 0 1 0 1.054-1.067zM5.318 16.606a.75.75 0 1 0-1.277.788zm6.565 5.144c5.062 0 9.18-4.058 9.18-9.083h-1.5c0 4.18-3.43 7.583-7.68 7.583zm9.18-9.083V11h-1.5v1.667zm-1.276-2.2L18.1 12.133l1.055 1.067l1.686-1.667zm0 1.066l1.686 1.667l1.054-1.067l-1.686-1.666zM4.04 17.393a9.2 9.2 0 0 0 7.842 4.357v-1.5a7.7 7.7 0 0 1-6.565-3.644z\"/>",
    viewBox: "0 0 24 24",
    source: "solar:refresh-linear",
  },
  "success": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m8.5 12.5l2 2l5-5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:check-circle-line-duotone",
  },
  "tarifs": {
    body: "<g fill=\"none\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6 9h4\" opacity=\".5\"/><path stroke-width=\"1.5\" d=\"M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z\"/><path stroke-width=\"1.5\" d=\"M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172S2 9.229 2 13s0 5.657 1.172 6.828S6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828\"/><path stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"m6 5l3.735-2.477a3.24 3.24 0 0 1 3.53 0L17 5\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.991 13H18\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:wallet-money-line-duotone",
  },
  "telephone": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M5.007 6.933C5.05 5.8 5.7 4.774 6.537 3.937c1.394-1.393 3.616-1.206 4.5.38l.65 1.162c.585 1.05.35 2.426-.572 3.349m5.952 10.165c1.133-.042 2.159-.694 2.996-1.53c1.393-1.394 1.206-3.616-.38-4.5l-1.162-.65c-1.05-.585-2.426-.35-3.349.572\"/><path d=\"M5.007 6.933c-.073 1.908.41 5.149 3.66 8.4c3.251 3.25 6.492 3.733 8.4 3.66m-1.895-6.108s-1.119 1.12-3.148-.91c-2.028-2.028-.91-3.147-.91-3.147\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:phone-rounded-line-duotone",
  },
  "telephone-appel": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M14 2s2.2.2 5 3s3 5 3 5m-7.793-4.464s.99.282 2.475 1.767s1.768 2.475 1.768 2.475\"/><path d=\"m10.038 5.316l.649 1.163c.585 1.05.35 2.426-.572 3.349c0 0-1.12 1.119.91 3.148c2.028 2.028 3.147.91 3.147.91c.923-.923 2.3-1.158 3.349-.573l1.163.65c1.585.884 1.772 3.106.379 4.5c-.837.836-1.863 1.488-2.996 1.53c-1.908.073-5.149-.41-8.4-3.66c-3.25-3.251-3.733-6.492-3.66-8.4c.043-1.133.694-2.159 1.53-2.996c1.394-1.393 3.616-1.206 4.5.38Z\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:phone-calling-rounded-line-duotone",
  },
  "transport": {
    body: "<g fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M4 10c0-3.771 0-5.657 1.172-6.828S8.229 2 12 2s5.657 0 6.828 1.172S20 6.229 20 10v2c0 3.771 0 5.657-1.172 6.828S15.771 20 12 20s-5.657 0-6.828-1.172S4 15.771 4 12z\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 13h16\" opacity=\".5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.5 16H17M7 16h1.5\"/><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 19.5V21a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1v-1m8.5-.5V21a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1M20 9h1a1 1 0 0 1 1 1v1a1 1 0 0 1-.4.8L20 13M4 9H3a1 1 0 0 0-1 1v1a1 1 0 0 0 .4.8L4 13\" opacity=\".5\"/><path stroke-linecap=\"round\" d=\"M19.5 5h-15\" opacity=\".5\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:bus-line-duotone",
  },
  "warning": {
    body: "<g fill=\"none\"><path stroke=\"currentColor\" stroke-width=\"1.5\" d=\"M5.312 10.762C8.23 5.587 9.689 3 12 3s3.77 2.587 6.688 7.762l.364.644c2.425 4.3 3.638 6.45 2.542 8.022S17.786 21 12.364 21h-.728c-5.422 0-8.134 0-9.23-1.572s.117-3.722 2.542-8.022z\" opacity=\".5\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\" d=\"M12 8v5\"/><circle cx=\"12\" cy=\"16\" r=\"1\" fill=\"currentColor\"/></g>",
    viewBox: "0 0 24 24",
    source: "solar:danger-triangle-line-duotone",
  },
};

export const ICON_NAMES = Object.keys(ICONS) as readonly IconName[];
