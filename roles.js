/**
 * roles.js — RCO IT Help Site  ·  Access Control
 * ─────────────────────────────────────────────────────────────────────────────
 * ROLE HIERARCHY  (highest → lowest privilege)
 *
 *   it_admin   Full access: all surveys/forms, Google Sheets links,
 *              can view ALL users' submissions in the Completed section.
 *
 *   leadership Owners + C-suite: can see and fill all surveys/forms,
 *              can see their own submissions. No Google Sheets access.
 *
 *   director   Directors: can see and fill director-level+ surveys/forms.
 *
 *   manager    Managers & Supervisors: can see and fill manager-level+ items.
 *
 *   staff      General employees: can only access items with minRole:'staff'.
 *              Any @rowecasaorganics.com address NOT listed below is staff.
 *
 * ── HOW TO UPDATE ROLES ──────────────────────────────────────────────────────
 *   1. Find the employee's email in any array below.
 *   2. Move it to the correct array.
 *   3. All comparisons are case-insensitive.
 *   Employees without @rowecasaorganics.com addresses cannot sign in at all.
 *
 * ── HOW TO ADD A NEW SURVEY OR FORM ─────────────────────────────────────────
 *   Add an entry to CONTENT_CONFIG.surveys or CONTENT_CONFIG.forms below.
 *   Set minRole to the lowest role that should see it.
 *   Set sheetUrl once the Google Sheet is created.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Numeric weights — higher = more access
const LEVELS = { it_admin: 4, leadership: 3, director: 2, manager: 1, staff: 0 };

const MEMBERS = {

  // ── IT TEAM ─────────────────────────────────────────────────────────────────
  // Full access + Google Sheets links + view all submissions
  // ⚠️  Kasey Tomasek, Hayden Howell, Chase Parrish — no @rowecasaorganics.com
  //     address found in BambooHR. Uncomment and fill in when confirmed.
  it_admin: [
    'philip@rowecasaorganics.com',          // Philip Williams   — Chief Information Officer
    'andrew.neidley@rowecasaorganics.com',  // Andrew Neidley    — IT Specialist
    // 'kasey.tomasek@rowecasaorganics.com', // Kasey Tomasek    — Director of IT  ← ADD EMAIL
    // 'hayden.howell@rowecasaorganics.com', // Hayden Howell    — IT Specialist   ← ADD EMAIL
    // 'chase.parrish@rowecasaorganics.com', // Chase Parrish    — IT Specialist   ← ADD EMAIL
  ],

  // ── OWNERS + C-SUITE ────────────────────────────────────────────────────────
  // All surveys visible + their own submissions. No Google Sheets.
  leadership: [
    'mike@rowecasaorganics.com',            // Mike Guzzardo     — Co-Owner / CEO
    'jill@rowecasaorganics.com',            // Jill Rowe         — Co-Owner / New Product Development
    'alicia@rowecasaorganics.com',          // Alicia Guzzardo   — Co-Owner / Branding & Customer Service
    'jacob@rowecasaorganics.com',           // Jacob Skinner     — Chief Operating Officer
    'chris.paulene@rowecasaorganics.com',   // Chris Paulene     — Chief Financial Officer
    'michael@rowecasaorganics.com',         // Michael Collins   — COS / CSO
    'grant@rowecasaorganics.com',           // Grant Barron      — Chief Marketing Officer
    'ivan.gonzalez@rowecasaorganics.com',   // Ivan Gonzalez     — Chief Compliance Officer
    'heidi.partlow@rowecasaorganics.com',   // Heidi Partlow     — Director of Strategic Projects
  ],

  // ── DIRECTORS ───────────────────────────────────────────────────────────────
  // director-level+ surveys visible + their own submissions. No Sheets.
  // ⚠️  Kevin Ludwig (Director of Product Innovation) and
  //     Cammie McCarty (Director of Accounting) — no @rowecasaorganics.com listed.
  director: [
    'carly@rowecasaorganics.com',               // Carly Barron       — Executive Director of Branding & Experience
    'kristen@rowecasaorganics.com',             // Kristen Duncan     — Marketing Director
    'celina.bianco@rowecasaorganics.com',       // Celina Bianco      — Director of Human Resources
    'carissa@rowecasaorganics.com',             // Carissa Clack      — Director of Procurement
    'courtneyd@rowecasaorganics.com',           // Courtney de Aquino — Customer Care Director
    'amanda@rowecasaorganics.com',              // Amanda Hardy       — Director of Quality Assurance
    'lisa@rowecasaorganics.com',                // Lisa Sangalli      — Director of Fulfillment
    'rachel.neidley@rowecasaorganics.com',      // Rachel Neidley     — Director of Production
    'reylia@rowecasaorganics.com',              // Reylia Morris      — Labeling & CI Director
    'darcie.snyder@rowecasaorganics.com',       // Darcie Snyder      — Director of Night Operations
    'laura@rowecasaorganics.com',               // Laura Williams     — Executive Director of R&D
    'krystle@rowecasaorganics.com',             // Krystle Wright     — Creative Director
  ],

  // ── MANAGERS & SUPERVISORS ──────────────────────────────────────────────────
  // manager-level+ surveys visible + their own submissions. No Sheets.
  manager: [
    // Customer Care
    'kelsea.berry@rowecasaorganics.com',        // Kelsea Berry          — Customer Care Manager
    'lara@rowecasaorganics.com',                // Lara Malloy           — Customer Care Manager
    'cassandra.oberembt@rowecasaorganics.com',  // Cassandra Oberembt    — Customer Care Manager
    'amanda.preddy@rowecasaorganics.com',       // Amanda Preddy         — Customer Care Manager
    'brandi@rowecasaorganics.com',              // Brandi Kennedy        — Customer Care Supervisor
    // Shipping / Fulfillment
    'tonia@rowecasaorganics.com',               // Tonia Brantley        — Shipping Supervisor
    'mark@rowecasaorganics.com',                // Mark Jackson          — Shipping Supervisor
    'alisha.wilson@rowecasaorganics.com',       // Alisha Wilson         — Shipping Supervisor
    // Quality Control
    'ashley.roberson@rowecasaorganics.com',     // Ashley Roberson       — QC Manager
    'kathy.sanford@rowecasaorganics.com',       // Kathy Sanford         — EHS / Training Coordinator
    'morgan.storey@rowecasaorganics.com',       // Morgan Storey         — Quality Complaints Coordinator
    // Production
    'casey@rowecasaorganics.com',               // Casey Durham          — Production Supervisor
    // Procurement / Warehouse
    'kaylee@rowecasaorganics.com',              // Kaylee Pope           — Warehouse / Receiving Manager
    'latasha.harris@rowecasaorganics.com',      // LaTasha Harris        — Purchasing Manager
    // Wholesale
    'katie@rowecasaorganics.com',               // Katie Roberson        — Wholesale Manager
    // Curing
    'courtney@rowecasaorganics.com',            // Courtney Simpson      — Curing Supervisor
    // Facilities
    'treavor.ford@rowecasaorganics.com',        // Treavor Ford          — Facilities Team Lead
    // Marketing / Social / Creative
    'lexie@rowecasaorganics.com',               // Lexie Skinner         — Partnership Manager
    'jessica@rowecasaorganics.com',             // Jessica Jenkins       — Content Creator & Strategist
    'jc@rowecasaorganics.com',                  // JC Estrada            — Paid Ad Creative Specialist
    'keasha@rowecasaorganics.com',              // Keasha Alexander      — Market Strategy & Education Specialist
    'summer@rowecasaorganics.com',              // Summer Still          — Content Specialist
    'ryan.churchill@rowecasaorganics.com',      // Ryan Churchill        — Graphic Designer
    'krystle@rowecasaorganics.com',             // Krystle Wright        — Creative Director (also in director)
    // Strategy / Projects
    'kacie@rowecasaorganics.com',               // Kacie Yates           — Project Manager
    // Specialist / Senior Coordinator level
    'leah.gideon@rowecasaorganics.com',         // Leah Gideon           — Partnership Coordinator
    'emily.seaman@rowecasaorganics.com',        // Emily Seaman          — Content & Label Specialist
    'graceh@rowecasaorganics.com',              // Grace Hargrove        — Wholesale Account Specialist
    'emma.parrish@rowecasaorganics.com',        // Emma Parrish          — Document Control Coordinator
  ],

  // staff is the implicit fallback — any @rowecasaorganics.com address
  // not matched above is treated as staff automatically.
  staff: [],
};


// ─────────────────────────────────────────────────────────────────────────────
// CONTENT CONFIGURATION
// Defines every survey and form, who can see it, and where its Sheet lives.
// ─────────────────────────────────────────────────────────────────────────────
export const CONTENT_CONFIG = {
  surveys: [
    {
      id:       'tech-discovery',
      title:    'RCO IT Software Inventory',
      minRole:  'manager',   // manager and above can see and fill this out
      sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit',
      url:      'surveys/tech-discovery.html',
    },
    // Add future surveys here:
    // { id: 'next-survey', title: '...', minRole: 'staff', sheetUrl: '...', url: '...' },
  ],

  forms: [
    {
      id:       'onboarding',
      title:    'User Onboarding Request',
      minRole:  'manager',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_ONBOARDING_SHEET_ID/edit',
      url:      null, // set to path when live
    },
    {
      id:       'offboarding',
      title:    'User Offboarding Request',
      minRole:  'manager',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_OFFBOARDING_SHEET_ID/edit',
      url:      null,
    },
    {
      id:       'equipment',
      title:    'IT Equipment & Software Request',
      minRole:  'staff',   // any employee can request equipment
      sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_EQUIPMENT_SHEET_ID/edit',
      url:      null,
    },
  ],
};


// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Returns the role string for an email ('it_admin' | 'leadership' | 'director' | 'manager' | 'staff'). */
export function getRole(email) {
  const e = (email || '').toLowerCase().trim();
  for (const [role, list] of Object.entries(MEMBERS)) {
    if (list.some(m => m.toLowerCase() === e)) return role;
  }
  return 'staff';
}

/** Returns the numeric privilege level for an email (0–4). */
export function getRoleLevel(email) {
  return LEVELS[getRole(email)] ?? 0;
}

/** Returns a short display label for the badge in the UI. */
export function getRoleLabel(email) {
  return { it_admin: 'IT Admin', leadership: 'Leadership', director: 'Director', manager: 'Manager', staff: 'Staff' }[getRole(email)] ?? 'Staff';
}

/** True if the user can see and access a specific survey/form by content id. */
export function canAccess(email, contentId) {
  const all = [...CONTENT_CONFIG.surveys, ...CONTENT_CONFIG.forms];
  const item = all.find(c => c.id === contentId);
  if (!item) return false;
  return getRoleLevel(email) >= (LEVELS[item.minRole] ?? 0);
}

/** True if the user should see Google Sheets links (IT admins only). */
export function canViewSheets(email) {
  return getRole(email) === 'it_admin';
}

/** True if the user can see ALL submissions in the Completed view (not just their own). */
export function canViewAllSubmissions(email) {
  return getRole(email) === 'it_admin';
}
