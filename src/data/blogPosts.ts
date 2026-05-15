export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  metaDescription: string
  content: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'b2b-cold-outbound-system-14-days',
    title: 'How B2B teams go from zero to a live cold outbound system in 14 days',
    excerpt:
      'Most agencies stretch onboarding across six weeks. Here is the day-by-day build sequence we use to get sending infrastructure live in two weeks — without skipping deliverability.',
    category: 'Outbound systems',
    date: '2025-04-22',
    readTime: '8 min read',
    metaDescription:
      'A practical 14-day timeline for launching B2B cold outbound: ICP, infrastructure, list build, sequences, and go-live — from the Krionics delivery playbook.',
    content: [
      'Cold outbound fails when teams treat it like a campaign instead of a system. A campaign has a start and end date. A system has infrastructure, inputs, outputs, and someone responsible for running it every business day.',
      'At Krionics, we compress the first build into 14 days because we have done it enough times to know which steps cannot be parallelized — and which ones can.',
      '**Day 0 — Kickoff and diagnosis.** One 60-minute call. We audit your ICP, existing CRM data, domain health, and current tool stack. You leave with a written system spec: what we are building, which tier fits, and what success looks like at day 30.',
      '**Days 1–7 — Infrastructure.** Domains purchased and warmed. Five dedicated sending inboxes configured with SPF, DKIM, and DMARC. Apollo and Clay pipelines built and tested. Nothing sends to prospects until authentication and warmup checks pass.',
      '**Days 8–13 — List and copy.** ICP-filtered prospect list built, verified, and enriched — typically 1,500–3,000 contacts for month one. Sequences written with segment-specific opening lines. Subject line variants drafted for A/B testing. You review before anything goes live.',
      '**Day 14 — Launch.** Sequences go live. Your reporting dashboard goes live. Deliverability is monitored from hour one. Positive replies route to your CRM and calendar via n8n automation.',
      '**After launch — Operate.** The retainer covers daily operation: inbox monitoring, sequence rotation, monthly ICP reviews, and weekly performance reports. The system improves from data — not from quarterly strategy decks.',
      'If you are evaluating agencies, ask one question: what exactly is live on day 14? If the answer is a strategy document, you are buying consulting. If the answer is warmed inboxes, verified lists, and sequences sending — you are buying a system.',
    ],
  },
  {
    slug: 'cold-email-deliverability-what-matters',
    title: 'Cold email deliverability: what actually matters in 2025',
    excerpt:
      'SPF records alone will not save a bad list. We break down the deliverability stack — authentication, volume, copy signals, and reply handling — in the order that matters.',
    category: 'Deliverability',
    date: '2025-03-10',
    readTime: '7 min read',
    metaDescription:
      'Cold email deliverability in 2025: SPF, DKIM, DMARC, inbox warmup, list quality, and copy signals — explained for B2B sales leaders.',
    content: [
      'Deliverability is the constraint most outbound programs ignore until it is too late. By the time your open rates collapse, you have usually burned domains, damaged sender reputation, and lost weeks of pipeline.',
      '**Authentication is table stakes.** SPF, DKIM, and DMARC must be correctly configured on every sending domain before volume increases. This is not optional — it is the minimum bar for inbox providers in 2025.',
      '**Warmup is not a checkbox.** New inboxes need a 14-day warmup period with gradually increasing send volume and realistic reply patterns. Skipping warmup to hit a launch deadline is how teams end up in spam folders on week two.',
      '**List quality beats list size.** Two thousand unverified contacts will perform worse than eight hundred verified, ICP-matched prospects. Verification, enrichment, and segment-level filtering (via Apollo and Clay) are part of deliverability — not separate from it.',
      '**Copy signals matter.** Spam filters analyze patterns: excessive links, all-caps subject lines, identical body copy across thousands of sends. Personalization at the opening line level — not mail-merge first-name tokens — changes how messages are classified.',
      '**Reply handling affects reputation.** When prospects reply positively, routing them quickly and stopping further sequence emails on that contact protects your sender score. Automation (n8n + CRM) makes this consistent instead of dependent on someone checking a shared inbox.',
      '**Monitor daily, not monthly.** Bounce rates, spam complaints, and placement tests should be reviewed every business day during the first 30 days after launch. Problems caught in week one are fixable. Problems caught in month three often require new domains.',
    ],
  },
  {
    slug: 'outbound-agency-vs-in-house-sdr',
    title: 'When to hire an outbound agency vs building in-house',
    excerpt:
      'An SDR hire, a tool stack, and an agency retainer each solve different problems. Here is how we help founders choose — including when we tell them outbound is not the right move yet.',
    category: 'Strategy',
    date: '2025-02-18',
    readTime: '6 min read',
    metaDescription:
      'Outbound agency vs in-house SDR vs DIY tools: a decision framework for B2B founders — costs, timelines, and when each option makes sense.',
    content: [
      'Founders ask us this on almost every discovery call: should we hire an SDR, buy tools and DIY, or work with an agency like Krionics? The honest answer depends on stage, ACV, and whether you have a proven offer — not on which option sounds fastest.',
      '**Hire an SDR when** you have a repeatable sales process, a manager who can coach outbound, and 6+ months of runway to absorb ramp time. A good SDR costs $70–90K/year fully loaded in the US, plus 60–90 days before they are fully productive. That works when pipeline is already your bottleneck and you need a human on calls full-time.',
      '**DIY with tools when** you have someone internally who can spend 10–15 hours per week on list building, copy, and deliverability monitoring — and you are okay with slower iteration. Apollo, Instantly, and Clay are powerful. They are also easy to misconfigure without experience.',
      '**Work with an agency when** you need the system live in weeks, not quarters — and you want operators who have built dozens of outbound programs. Agency economics make sense when your ACV supports $2,500–$7,500/month in program cost and one to two additional qualified meetings per month pays for the engagement.',
      '**When outbound is not right yet:** pre-product-market-fit, no defined ICP, or an offer that has not closed manually at least five times. No system fixes a positioning problem. We say this directly because a bad-fit client costs both sides.',
      'The math is straightforward. Compare your fully loaded SDR cost + tools + management time against agency retainer + setup. Factor in time-to-live (14 days vs 90 days) and what you own if the relationship ends — at Krionics, you keep the domains, data, and sequences.',
    ],
  },
  {
    slug: 'ai-voice-agents-inbound-qualification',
    title: 'AI voice agents for inbound qualification: what to design first',
    excerpt:
      'Inbound is where B2B pipeline either compounds or leaks. This guide breaks down the call-flow decisions that make qualification, objection handling, and booking behavior reliable.',
    category: 'AI voice agents',
    date: '2025-01-12',
    readTime: '6 min read',
    metaDescription:
      'AI voice agent inbound qualification: call-flow design, objection handling, booking logic, and operational checks using Vapi, Twilio, and ElevenLabs.',
    content: [
      'Inbound calls are where most B2B teams lose momentum. Email can be ignored. A call has intent. Your agent’s job is to turn that intent into the next correct step.',
      '**Step 1 — Define what “qualified” means.** Before you touch the voice setup, write the qualification rules in plain language: the ICP criteria you can confirm on a call, the disqualifiers you should respect, and the minimum booking conditions.',
      '**Step 2 — Build a call flow with success and fallback paths.** Every branching script needs two things: what a “successful outcome” sounds like, and what a fallback path does when information is missing or the caller is unsure.',
      '**Step 3 — Encode objection handling as logic, not vibes.** Objections should map to specific responses and follow-up questions. If you cannot answer an objection directly, the agent should guide the caller into the next step (often a shorter diagnostic call).',
      '**Step 4 — Decide how booking works (and when to stop).** The agent should book only when it meets your minimum criteria. Otherwise, it should gather the missing details or explain next steps without forcing a calendar slot.',
      '**Step 5 — Operate with post-call checks.** After launch, audit call transcripts, missed objections, booking errors, and handoff accuracy. Update scripts quickly during the first weeks.',
      'At Krionics, we build voice agents using Vapi with routing and integrations (including Twilio when needed) and voice profiles via ElevenLabs. Booking is connected to Calendly or Cal.com, and post-call automation runs through n8n.',
      'We include a 30-day hypercare window after launch so issues do not linger. When you treat inbound qualification as an operational system, booking behavior becomes predictable.',
    ],
  },
  {
    slug: 'linkedin-outbound-system-playbook',
    title: 'A LinkedIn outbound system playbook (for teams that hate busywork)',
    excerpt:
      'A few good messages beat constant posting. This playbook shows how to set up connection outreach, conversation qualification, and reply routing so LinkedIn becomes a dependable pipeline input.',
    category: 'Outbound systems',
    date: '2025-05-01',
    readTime: '7 min read',
    metaDescription:
      'LinkedIn outbound system playbook: connection strategy, messaging sequences, reply qualification, segmentation, and operational checks for B2B teams.',
    content: [
      'LinkedIn outbound works when it is treated like a system. A system has inputs (targeting and segments), a repeatable sequence, and someone responsible for running and iterating it.',
      '**Start with segments that map to ICP decisions.** Don’t build a giant list and hope. Define segments based on what you can validate: role, company stage, hiring signals, or product fit.',
      '**Use a connection sequence that earns the first reply.** Your first message should be short, specific, and relevant to why that person is receiving it. Focus on “why you” in one sentence and one clear question.',
      '**Qualify in the conversation, not in a spreadsheet.** When someone replies, your next step should be deterministic. Either they meet criteria and book, or they need one missing detail, or they are not a fit.',
      '**Write follow-ups for outcomes.** Each follow-up should exist because something might happen next: no reply, vague interest, wrong timing, or a direct objection.',
      '**Route replies to your CRM and calendar.** If your team still copies and pastes across tools, LinkedIn will stay inconsistent. Automation makes the process reliable.',
      'Finally, measure output by segment: reply rate and booking rate. If one segment underperforms, adjust targeting or scripts first — not effort.',
      'Krionics helps teams operationalize LinkedIn outreach alongside cold email so inbound and outbound reinforce each other instead of competing for time.',
    ],
  },
  {
    slug: 'roi-calculator-for-cold-outbound',
    title: 'How to think about ROI for cold outbound (with a real example)',
    excerpt:
      'ROI is not a spreadsheet fantasy. Use a simple model: annual cost, expected closed-won conversions, and meetings booked from your system output.',
    category: 'ROI',
    date: '2025-02-05',
    readTime: '8 min read',
    metaDescription:
      'How to calculate ROI for cold outbound: meetings output, close rate, ACV, and annual cost model. Includes an example aligned with Krionics pricing math.',
    content: [
      'If you cannot explain ROI on one page, you cannot manage pipeline. The fix is not a more complex model. The fix is a model tied to real system output.',
      '**1) Start with expected meetings per month.** Your system produces meetings when lists, sequences, deliverability, and reply handling are working together.',
      '**2) Convert meetings into new customers.** Multiply annual meetings by your meeting → closed-won rate. That gives you expected new customers.',
      '**3) Convert customers into ARR.** Multiply expected new customers by your average contract value (ACV).',
      '**4) Subtract the annual cost.** Krionics annual cost model (cold email tiers) is: $2,500 × 12 + $2,000 setup = $32,000.',
      'Here is a realistic example: imagine your system books 12 meetings per month, and your close rate is 20%. Annual meetings would be 144. Expected new customers would be 144 × 20% = 28.8.',
      'If your ACV is $24,000, expected new ARR would be 28.8 × 24,000 = $691,200. Compared to an annual system cost of $32,000, the ROI is strong — and the decision becomes about how fast you start.',
      'This model is intentionally simple. The point is to pressure-test your assumptions: if any input is off, you adjust system inputs first, not expectations.',
      'If you want to run the numbers with your real constraints (offer, ICP, close motion, and capacity), book a call and we will walk through it.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
