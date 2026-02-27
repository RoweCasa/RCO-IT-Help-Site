/**
 * roles.js — RCO IT Help Site  ·  Access Control
 */

const LEVELS = { it_admin: 4, leadership: 3, director: 2, manager: 1, staff: 0 };

const MEMBERS = {
  it_admin: [
    'philip@rowecasaorganics.com',
    'andrew.neidley@rowecasaorganics.com',
    'kasey.tomasek@rowecasaorganics.com',
    'hayden.howell@rowecasaorganics.com',
    'chase.parrish@rowecasaorganics.com',
  ],
  leadership: [
    'mike@rowecasaorganics.com',
    'jill@rowecasaorganics.com',
    'alicia@rowecasaorganics.com',
    'jacob@rowecasaorganics.com',
    'chris.paulene@rowecasaorganics.com',
    'michael@rowecasaorganics.com',
    'grant@rowecasaorganics.com',
    'ivan.gonzalez@rowecasaorganics.com',
    'heidi.partlow@rowecasaorganics.com',
  ],
  director: [
    'carly@rowecasaorganics.com',
    'kristen@rowecasaorganics.com',
    'celina.bianco@rowecasaorganics.com',
    'carissa@rowecasaorganics.com',
    'courtneyd@rowecasaorganics.com',
    'amanda@rowecasaorganics.com',
    'lisa@rowecasaorganics.com',
    'rachel.neidley@rowecasaorganics.com',
    'reylia@rowecasaorganics.com',
    'darcie.snyder@rowecasaorganics.com',
    'laura@rowecasaorganics.com',
    'krystle@rowecasaorganics.com',
    'kevin.ludwig@rowecasaorganics.com',
    'cammie.mccarty@rowecasaorganics.com',
  ],
  manager: [
    'kelsea.berry@rowecasaorganics.com',
    'lara@rowecasaorganics.com',
    'cassandra.oberembt@rowecasaorganics.com',
    'amanda.preddy@rowecasaorganics.com',
    'brandi@rowecasaorganics.com',
    'tonia@rowecasaorganics.com',
    'mark@rowecasaorganics.com',
    'alisha.wilson@rowecasaorganics.com',
    'ashley.roberson@rowecasaorganics.com',
    'kathy.sanford@rowecasaorganics.com',
    'morgan.storey@rowecasaorganics.com',
    'casey@rowecasaorganics.com',
    'kaylee@rowecasaorganics.com',
    'latasha.harris@rowecasaorganics.com',
    'katie@rowecasaorganics.com',
    'courtney@rowecasaorganics.com',
    'treavor.ford@rowecasaorganics.com',
    'lexie@rowecasaorganics.com',
    'jessica@rowecasaorganics.com',
    'jc@rowecasaorganics.com',
    'keasha@rowecasaorganics.com',
    'summer@rowecasaorganics.com',
    'ryan.churchill@rowecasaorganics.com',
    'krystle@rowecasaorganics.com',
    'kacie@rowecasaorganics.com',
    'leah.gideon@rowecasaorganics.com',
    'emily.seaman@rowecasaorganics.com',
    'graceh@rowecasaorganics.com',
    'emma.parrish@rowecasaorganics.com',
  ],
  staff: [],
};

export const CONTENT_CONFIG = {
  surveys: [
    {
      id:       'tech-discovery',
      title:    'RCO IT Software Inventory',
      minRole:  'manager',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/1qGufmR0KvRCU8OhQiZgf1R9CnvEvBBHogAcUh6XbOeM/edit?gid=72884401#gid=72884401',
      url:      'surveys/tech-discovery.html',
    },
  ],
  forms: [
    {
      id:       'onboarding',
      title:    'User Onboarding Request',
      minRole:  'manager',
      sheetUrl: 'YOUR_ONBOARDING_SHEET_URL',
      url:      'forms/onboarding.html',
    },
    {
      id:       'offboarding',
      title:    'User Offboarding Request',
      minRole:  'manager',
      sheetUrl: 'YOUR_OFFBOARDING_SHEET_URL',
      url:      'forms/offboarding.html',
    },
    {
      id:       'equipment',
      title:    'IT Equipment & Software Request',
      minRole:  'manager',
      sheetUrl: 'YOUR_EQUIPMENT_SHEET_URL',
      url:      'forms/equipment.html',
    },
  ],
};

export function getRole(email) {
  const e = (email || '').toLowerCase().trim();
  for (const [role, list] of Object.entries(MEMBERS)) {
    if (list.some(m => m.toLowerCase() === e)) return role;
  }
  return 'staff';
}
export function getRoleLevel(email) { return LEVELS[getRole(email)] ?? 0; }
export function getRoleLabel(email) {
  return { it_admin:'IT Admin', leadership:'Leadership', director:'Director', manager:'Manager', staff:'Staff' }[getRole(email)] ?? 'Staff';
}
export function canAccess(email, contentId) {
  const all  = [...CONTENT_CONFIG.surveys, ...CONTENT_CONFIG.forms];
  const item = all.find(c => c.id === contentId);
  if (!item) return false;
  return getRoleLevel(email) >= (LEVELS[item.minRole] ?? 0);
}
export function canViewSheets(email)         { return getRole(email) === 'it_admin'; }
export function canViewAllSubmissions(email) { return getRole(email) === 'it_admin'; }
