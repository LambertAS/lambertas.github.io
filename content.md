# Site content — v2

Text in `[[ double brackets ]]` is a decision or a gap only I can fill.
Text in `<!-- comments -->` is a note to me and must never render.

---

## Hero

**Lambert Aditama Soehardjianto**

Data and business analyst. I work between the people who have the question and
the systems that hold the answer.

Jakarta, Indonesia. Available from October 2026.

---

## Intro

I finished a Computer Science and Statistics degree at BINUS this year and spent
the last eight months as a data analyst intern in HR information systems at
PT Lion Super Indo, a national supermarket chain.

Most of what I do sits in the gap between a business question and a working
system. Someone in HR needs to know something. The data exists, but it is spread
across exports that do not share a key, and the question they asked is not quite
the question the data can answer. The work is figuring out what they actually
need, whether the data can support it, and then building something that keeps
producing the answer after I stop touching it.

My degree was half statistics, which shapes how I approach this. I am more
interested in whether a number is trustworthy than in whether it is impressive.

---

## Selected work

### Employee pulse survey analytics pipeline
**PT Lion Super Indo, 2026. Python, pandas, python-pptx**

The annual employee pulse survey covered roughly 9,000 responses across the
organisation. The reporting was assembled by hand each year, which limited how
much could be reported and how fast.

I built the pipeline that replaced it. Raw export goes in, mapped to org units,
stratified sampling applied, and a formatted PowerPoint report comes out for each
unit.

The org-unit mapping was the hard part. Reporting structures do not match the
shape of the data export, and getting responses attributed to the right unit
without breaking respondent anonymity took more iteration than the analysis did.

Stratified rather than simple sampling because unit sizes vary by an order of
magnitude, and a naive sample would let the largest units dominate every reported
figure.

[[ What would I do differently if I ran this again? ]]

<!-- Scale and technique only. No internal figures, no results, no unit names. -->

### HR service ticket SLA dashboard
**PT Lion Super Indo, 2026. Power BI**

The report already existed as an Excel file. It showed one period, it could not
be filtered, and updating it meant someone opening the file and editing it again
by hand every cycle.

I rebuilt it in Power BI. I reshaped the source data, then built the
visualisations and interactive filters, choosing each chart type to fit what the
measure actually was rather than applying one format across everything.

Cleaning was the hard part, and it came before any of the visual work. Not every
ticket in the export was in a finished state. Some were still open and some had
not been accepted yet, and those cannot be counted alongside closed tickets
without distorting every SLA figure on the page. Getting that state logic right
determined whether anything downstream meant what it appeared to mean.

I presented the finished dashboard to my Department Head and the General
Managers, walking through how it worked and why each chart was built the way it
was.

[[ What would I do differently if I ran this again? ]]

### Performance Management System dashboard prototypes
**PT Lion Super Indo, 2026. Figma**

I prototyped the dashboard for the Performance Management System revamp across
three access levels: Associate, People Leader, and the Admin panel. Each role
sees a different slice of the system, so each needed its own layout rather than
one screen with sections hidden depending on who is looking.

Against the previous version, what changed was the visualisation. Cleaner charts,
KPI cards chosen because they were relevant rather than because the data happened
to be available, and a more compact layout so a leader can read their view
without scrolling past everything else first.

I also supported my team on the wider functionality revamp of the Performance
Management System. The dashboard was my part of it.

[[ What would I do differently if I ran this again? ]]

### Requirements work on HR system upgrades
**PT Lion Super Indo, 2026**

I wrote three Business Requirement Documents with supporting cost-benefit
analyses for HR system upgrades. All three were approved and went into build.

I also ran the weekly requirements sessions between HR and IT. These two groups
describe the same problem in incompatible vocabulary, and much of the value in
those meetings came from noticing when agreement was only apparent. Translating
what HR described into functional specifications IT could estimate against was
the actual deliverable, not the meeting.

[[ What would I do differently if I ran this again? ]]

### User acceptance testing, performance appraisal module
**PT Lion Super Indo, 2026**

I ran UAT across 15 scenarios, logged 20 defects in an issue log, and retested
each one to closure before launch. I wrote the end-user manual that shipped with
it.

The defects were functional. Buttons that did nothing when clicked. Filters that
returned the wrong set of records. Fields with no validation at all, and fields
accepting special characters they should have rejected. Several sat in the record
operations themselves, where adding, editing or deleting did not behave the way
the specification said it would.

[[ What would I do differently if I ran this again? ]]

---

## Research

### Learning from Imbalanced Stroke Data: SMOTE vs SMOTE-ENN
**First author. ICISS 2026, Bandung. Presented August 2026, publication forthcoming**

Stroke prevalence in this dataset was 4.87% across 5,110 records. At that ratio a
model that predicts "no stroke" for every patient scores about 95% accuracy and
is completely useless, which is the practical problem the paper addresses.

I compared three resampling regimes across logistic regression, SVM with an RBF
kernel, and XGBoost, holding preprocessing and tuning fixed so the comparison
isolated the resampling choice. Ranked on PR-AUC and recall rather than accuracy,
then checked the result held up under cross-validation, SHAP, and calibration
curves.

The calibration step mattered. Resampling changes the base rate the model sees,
so predicted probabilities stop meaning what they appear to mean unless you
check.

### Evaluating the Jellyfish Optimization Algorithm for Feature Selection
**Second author. IEEE iCAST 2025. DOI: 10.1109/iCAST68191.2025.11300257**

I implemented the algorithm from scratch and benchmarked it as a feature selector
against a no-selection baseline across five classifiers on 918 records.

Implementing it rather than importing it was the point. Metaheuristics are easy
to describe and easy to get subtly wrong, and writing it out surfaced parameter
choices the original description left implicit.

---

## Analysis project

[[ TODO: this section stays deleted until the project exists.
   Do not publish a "coming soon" placeholder. ]]

---

## How I work

**I would rather know a number is wrong than have it look right.**
Most of the time spent on the pulse survey pipeline went into the mapping and
validation steps, not the analysis. Analysis on data you have not interrogated
produces confident nonsense.

**The question people ask is usually not the question they need answered.**
Requirements work taught me this more directly than coursework did. Someone asks
for a report. What they need is to make a decision, and the report they described
would not have supported it.

**Cleaning decides what the analysis is allowed to say.**
On the SLA dashboard the whole result turned on how open and unaccepted tickets
were treated. That is a data-cleaning decision, and it set the meaning of every
number on the page.

**Reproducible beats clever.**
A pipeline anyone can rerun next year is worth more than a smart one-off analysis
that only exists in my notebook.

**Statistics is mostly about what you are allowed to conclude.**
Half my degree was statistics, and the part that transferred most was not the
methods. It was the habit of asking what would have to be true for this result to
mean what I want it to mean.

---

## Tools

**Languages** Python (pandas, NumPy, scikit-learn, statsmodels), R (tidyverse,
ggplot2), SQL

**Business intelligence** Power BI, automated reporting with python-pptx,
matplotlib, ggplot2, Excel

**Business analysis** Requirements gathering, business requirement documents,
functional specifications, cost-benefit analysis, user acceptance testing,
wireframing and prototyping in Figma

**Statistics** Regression, classification, imbalanced-data methods, hypothesis
testing, sampling design, time series

**Certification** HackerRank, 2026: SQL (Advanced), R (Intermediate),
Problem Solving (Intermediate), Software Engineer (role certification)

---

## Education

**BINUS University**, Jakarta, Indonesia
BSc Computer Science and Statistics, August 2022 to August 2026
GPA 3.72 / 4.00

Coursework: Machine Learning, Deep Learning, Data Mining and Visualization,
Multivariate Statistics, Regression Analysis, Categorical Data Analysis, Time
Series Analysis, Database Technology, Software Engineering.

**Kairos Gracia Christian School**, Jakarta, Indonesia
High School, July 2019 to May 2022

Cambridge A Level: A in Pure Mathematics, July 2022
Cambridge AS Level: A in Pure Mathematics, A in Business Studies, June 2021

---

## Beyond the work

**HIMSTAT BINUS** — Project Manager, Statistics Competition Delegation,
February 2023 to February 2025
Ran planning, scheduling, judge coordination and the post-event report for a
statistics competition with more than 50 participants.

**Teach for Indonesia, BINUS** — Education Volunteer, August to September 2023
Delivered 10 structured mathematics sessions for secondary students, designing
the materials and tracking understanding with exit tickets.

**SASC Mentoring Scholarship** — Mentor, August 2025 to present

**Languages** Indonesian (native), English (fluent), Mandarin (conversational)

---

## Contact

lambertaditama@gmail.com

LinkedIn: linkedin.com/in/lambert-aditama-soehardjianto
ResearchGate: researchgate.net/profile/Lambert-Aditama-Soehardjianto
GitHub: [[ add once the profile has something on it ]]

<!-- Phone number deliberately omitted from the public page. -->
<!-- No contact form. mailto only. -->
