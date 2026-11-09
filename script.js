const projectData = {
  phishing: {
    number: "PROJECT_01 / EMAIL SECURITY",
    title: "Phishing Email Investigation & IOC Analysis",
    intro: "A simulated SOC-style investigation designed to determine whether a suspicious email reported by an employee was malicious.",
    sections: [
      ["The project", "I analysed a simulated phishing email, examined its sending infrastructure and extracted indicators that could help establish whether the message was malicious."],
      ["Why I built it", "I wanted to understand how a SOC analyst moves from an employee-reported suspicious email to an evidence-based assessment and a clear verdict."],
      ["Objective", "Analyse the email, identify and assess indicators of compromise (IOCs), document the investigation and reach a reasoned conclusion."],
      ["What I did", ["Reviewed the email headers and sender details.", "Examined the sending infrastructure.", "Extracted URLs and other potential indicators.", "Analysed suspicious links and domains.", "Checked indicators against threat-intelligence sources.", "Documented the evidence and final assessment."]],
      ["Skills developed", ["Suspicious email analysis and header interpretation.", "IOC identification and extraction.", "Threat-intelligence research.", "Evidence handling and clear investigation reporting."]],
      ["Outcome & real-world relevance", "Produced a structured phishing investigation report containing evidence, analysis and findings. This workflow reflects a common SOC triage task: assessing reported messages, identifying malicious indicators and communicating a defensible conclusion."]
    ],
    tools: ["Email header analysis", "VirusTotal", "CyberChef", "URL / domain analysis", "Threat intelligence"],
    evidence: ["Investigation report", "Screenshots of analysis", "Sample email headers", "IOC list"]
  },
  soc: {
    number: "PROJECT_02 / SECURITY MONITORING",
    title: "Home SOC / Threat Detection Lab",
    intro: "A small Windows-based lab for generating endpoint events, collecting telemetry and investigating suspicious PowerShell activity.",
    sections: [
      ["The project", "I built a home lab using a Windows virtual machine, Sysmon and Splunk to explore how endpoint activity can be logged, searched and investigated."],
      ["Why I built it", "I wanted to move beyond reading about SIEM workflows and practise how analysts collect logs, investigate suspicious behaviour and develop basic detections."],
      ["Objective", "Generate security events in a controlled environment, collect relevant logs, investigate suspicious activity and create a basic detection query."],
      ["What I did", ["Set up a Windows virtual machine.", "Installed and configured Sysmon.", "Generated different security events in the lab.", "Collected and researched logs in Splunk.", "Investigated suspicious PowerShell activity.", "Created a basic detection query and documented the process."]],
      ["Skills developed", ["Windows security logging and Sysmon telemetry.", "SIEM fundamentals and Splunk searches.", "Log analysis and basic detection engineering.", "Investigating endpoint activity and documenting findings."]],
      ["Outcome & real-world relevance", "Built a working home SOC environment and created a basic detection for suspicious PowerShell activity. The project demonstrates foundational workflows used in endpoint monitoring, alert investigation and detection development."]
    ],
    tools: ["Windows virtual machine", "Sysmon", "Splunk", "Windows Event Logs", "PowerShell"],
    evidence: ["Lab architecture diagram", "Lab screenshots", "Splunk detection query", "Sample logs", "Investigation notes", "GitHub repository"]
  },
  ioc: {
    number: "PROJECT_03 / SECURITY AUTOMATION",
    title: "Python IOC Enrichment Tool",
    intro: "A proof-of-concept command-line utility that accepts an indicator of compromise, queries threat intelligence and presents useful context for an analyst.",
    sections: [
      ["The project", "I created a Python script to enrich an IP address, domain or file hash using a threat-intelligence API and display selected information in a readable format."],
      ["Why I built it", "Analysts may need to look up indicators across external sources during investigations. I wanted to automate part of that repetitive initial research."],
      ["Objective", "Accept an IOC as input, query a threat-intelligence service, parse the response and present useful enrichment in an analyst-friendly way."],
      ["What I did", ["Created a script that accepts an IOC as input.", "Connected it to a threat-intelligence REST API.", "Parsed the API response and extracted relevant fields.", "Displayed results in a simple analyst-friendly format.", "Added basic error handling and documentation."]],
      ["Skills developed", ["Python scripting for cybersecurity.", "REST API integration and request handling.", "Working with JSON responses.", "Automating repetitive security tasks.", "Documenting a small security utility."]],
      ["Outcome & real-world relevance", "Created a working proof of concept for speeding up initial IOC research. Similar enrichment steps can help analysts gather context before deciding whether an indicator needs deeper investigation."]
    ],
    tools: ["Python", "REST APIs", "JSON", "VirusTotal API", "GitHub"],
    evidence: ["GitHub repository", "Source code", "Terminal screenshots", "Example API response", "Short demo"]
  }
};

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
const toast = document.getElementById("toast");
let lastFocusedElement = null;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function openProject(key) {
  const project = projectData[key];
  if (!project) return;
  lastFocusedElement = document.activeElement;
  const sectionMarkup = project.sections.map(([heading, content]) => {
    const body = Array.isArray(content)
      ? `<ul>${content.map(item => `<li>${item}</li>`).join("")}</ul>`
      : `<p>${content}</p>`;
    const full = heading === "What I did" || heading === "Outcome & real-world relevance";
    return `<section class="detail-block ${full ? "full" : ""}"><h3>${heading}</h3>${body}</section>`;
  }).join("");
  const toolsMarkup = project.tools.map(tool => `<span>${tool}</span>`).join("");
  const evidenceMarkup = project.evidence.map(item =>
    `<a class="evidence-item" href="#contact" data-placeholder="${item}"><span>${item}</span><small>PLACEHOLDER ↗</small></a>`
  ).join("");

  modalContent.innerHTML = `
    <p class="modal-kicker">${project.number}</p>
    <h2 id="modalTitle">${project.title}</h2>
    <p class="modal-intro">${project.intro}</p>
    <div class="detail-block full" style="margin-bottom:17px"><h3>Tools & technologies</h3><div class="modal-tools">${toolsMarkup}</div></div>
    <div class="detail-grid">${sectionMarkup}
      <section class="detail-block full"><h3>Evidence & project resources</h3><div class="evidence-grid">${evidenceMarkup}</div></section>
    </div>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeProject() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});
modal.addEventListener("click", event => {
  if (event.target.matches("[data-close-modal]")) closeProject();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeProject();
  if (event.key === "Tab" && modal.classList.contains("is-open")) {
    const focusable = [...modal.querySelectorAll("button, a[href]")].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.querySelectorAll("[data-placeholder]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showToast(`Add your ${link.dataset.placeholder} URL or file before publishing.`);
  });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
