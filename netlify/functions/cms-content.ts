import { Handler } from '@netlify/functions';

// Define what content can be edited for ACE Accountable
const EDITABLE_CONTENT = {
  homepage: {
    hero: {
      eyebrow: "Connecticut's Creative Bookkeeper",
      headline: {
        line1: "Your studio might be",
        highlight: "chaos",
        line2: "Your books don't have to be."
      },
      subheadline: "I'm Jenna. I help Connecticut artists track commissions, find every art supply deduction, and turn creative income into clear financial pictures. No judgment, just results.",
      cta1: "Book Your Free Artist Consultation",
      cta2: "Try Studio Expansion Calculator"
    },
    trustIndicators: {
      stat1: "Trusted by 50+ CT artists",
      stat2: "$3K+ average in found deductions",
      stat3: "Studio-friendly since 2015"
    }
  },
  forArtists: {
    title: "Why Artists Choose ACE",
    subtitle: "Because I understand that your business doesn't fit in a standard accounting box",
    features: [
      {
        title: "Project-Based Income Tracking",
        description: "Not just monthly books—I track each commission, exhibition sale, and workshop separately so you know which projects actually make money."
      },
      {
        title: "Every Deduction Found",
        description: "That vintage frame? Deductible. Studio rent paid in paintings? I'll handle it. 2am art supply runs? Got you covered."
      },
      {
        title: "Grant-Ready Financials",
        description: "Need financial statements for that arts grant? I create reports that speak 'grant committee' while keeping your actual books in artist-speak."
      },
      {
        title: "Feast & Famine Planning",
        description: "Big commission in March, nothing in April? I help you smooth out the creative income rollercoaster with smart cash flow planning."
      },
      {
        title: "Multi-Revenue Mastery",
        description: "Gallery sales, online prints, teaching workshops, Patreon—I track all your creative revenue streams without the confusion."
      },
      {
        title: "No Judgment Zone",
        description: "Shoebox of receipts? Three years behind? Mixing personal and business? I've seen it all, and I'm here to help, not judge."
      }
    ]
  },
  services: {
    title: "Simple Packages, Creative Results",
    subtitle: "Choose the level of support that fits your creative business",
    bookkeeping: {
      title: "Complete Bookkeeping",
      subtitle: "Custom pricing for your creative business",
      features: [
        "Transaction recording & categorization",
        "Bank & credit card reconciliation",
        "Balance sheet reconciliation",
        "Monthly financial statements",
        "Monthly video conference",
        "Unlimited email support",
        "Tax professional communication"
      ],
      cta: "Get Custom Quote",
      note: "Cancel anytime with 30 days notice"
    },
    addOns: {
      title: "Creative Add-Ons",
      subtitle: "Enhance your bookkeeping package",
      features: [
        "Rescue services (catch-up bookkeeping)",
        "Budgeting & cash flow planning",
        "Revenue forecasting",
        "Industry benchmarking",
        "1099 preparation",
        "Grant application financials"
      ],
      cta: "Learn About Add-Ons"
    }
  },
  contact: {
    phone: "860-365-1147",
    email: "Jenna@aceaccountablebk.com",
    location: "Middletown, CT"
  }
};

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters;
    const section = params?.section || 'all';
    
    if (section === 'all') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(EDITABLE_CONTENT),
      };
    }
    
    const sectionData = EDITABLE_CONTENT[section as keyof typeof EDITABLE_CONTENT];
    if (sectionData) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(sectionData),
      };
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Section not found' }),
    };
  }

  if (event.httpMethod === 'POST') {
    // In a real implementation, this would:
    // 1. Validate the user is authenticated
    // 2. Update the content in GitHub
    // 3. Trigger a rebuild
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Content updated (mock)' }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};