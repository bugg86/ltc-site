"use client";
import { DesktopNavbar } from "@/components/common/NavBar";
import { PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Image from "next/image";

export default function RulesPage() {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href")
    if (!href || !href.startsWith("#")) {
      return
    }

    const targetId = href.slice(1)
    const target = document.getElementById(targetId)
    if (!target) {
      return
    }

    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const Separator = () => (
    <div
      style={{
        position: "relative",
        width: "30vw",
        left: "20vw",
        height: "4.8vh",
        margin: "5vh 0",
      }}
    >
      <Image src="/rules/separator.svg" alt="separator" fill />
    </div>
  );

  const navItems = [
    {
      id: "rules-basic-info",
      label: "Basic Info",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Basic Info</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
              
            }}
          >
            <li>This is an international 2v2 double-elimination osu!standard tournament for players of all ranks.</li>
            <li style={{marginLeft:"5vw"}}><span style={{color: "#9FB878"}}>Badge weighted seeding (BWS)</span> will not be implemented.</li>
            <li>Minimum number of players per team is 2, maximum of 3.</li>
            <li>The tournament is badged (pending). Additionally we will be going for tri-badge.</li>
            <li>All players must be within rank range by the end of registrations. Otherwise you will be disqualified.</li>
            <li>All captains are required to join the Discord Server, if team captains leave at any point during screening or during matches will result in disqualification.</li>
            <li>All times will be in <span style={{color: "#9FB878"}}>UTC 24-hour format</span>, please be aware when scheduling.</li>
            <li>Commentators, and streamers will be allowed to participate in the tournament. This is excluding referees, poolers, replayers, and playtesters. Eliminated players may enlist as referees, mappool playtesters, and/or replayers.</li>
            <li>Trolling during matches is prohibited, show respect for your referees and the other players. Follow any and all instructions given by your referee.</li>
            <li><span style={{color: "#9FB878"}}>Cheating is obviously not allowed.</span></li>
          </ul>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-mappool",
      label: "Mappool Slot Description",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Mappool Slot Description</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>There will be <span style={{color: "#9FB878"}}>NO dedicated freemod</span> category in this tournament.</li>
            <li>During the bracket stage, there will be <span style={{color: "#9FB878"}}>one to three</span> maps under <span style={{color: "#9FB878"}}>EXTRA</span> (<span style={{color: "#9FB878"}}>EX</span> outlined on the main sheet and pooling category). This may entail maps being a specific mod, or even freemod, but this will vary each bracket stage.</li>
            <li>Some rounds may include maps that have different win conditions based on what our pooling team deems is the best way to determine which team is better at a specific map. An easy example is a rhythm map with an accuracy win condition, but it could be other things as well, such as: winner based on miss count, etc. Refer to the main sheet to see which maps have a different win condition.</li>
            <li>This will not be a normal pool, and will not be mechanically heavy. Raw aim and raw tapping will not be tested.</li>
            <li>Every mappool will aim to test the following skillsets:</li>
            <li><span style={{color: "#9FB878"}}>Conventional tech</span>, slider aim, <span style={{color: "#9FB878"}}>finger control</span>, aim control, <span style={{color: "#9FB878"}}>obscure reading</span>, and more <span style={{color: "#9FB878"}}>niche skillsets</span>.</li>
            <li>The mappools will be unconventional overall. There will be no strict format to the slots in the pools, please pay attention to the skillset/notes attached to the maps. We will aim to include maps that have not been pooled often.</li>
            <li><span style={{color: "#9FB878"}}>EZ multiplier</span>, if there is a freemod in an EX slot and/or Tiebreaker, will be given a custom EZ multiplier if warranted.</li>
          </ul>
        </>
      ),
    },
    {
      id: "rules-star-rating",
      label: "Stars and Send-offs",
      size: "2.3vh",
      marginBottom: "6vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", paddingLeft: "1vw", color: "#FFFCEA" }}>Star Rating and Bans</h3>
          <table
            style={{
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
              borderCollapse: "collapse",
              marginLeft: "1.5vw",
            }}
          >
            <thead>
              <tr>
                <th style={{ paddingLeft: ".5vw", paddingBottom: "1vh", fontWeight: "700", textAlign: "left", paddingRight: "3vw" }}>Round</th>
                <th style={{ paddingBottom: "1vh", fontWeight: "700", textAlign: "left", paddingRight: "3vw" }}>Star Rating</th>
                <th style={{ paddingBottom: "1vh", fontWeight: "700", textAlign: "left", paddingRight: "3vw" }}>Best Of</th>
                <th style={{ paddingBottom: "1vh", fontWeight: "700", textAlign: "left" }}>Bans</th>
              </tr>
            </thead>
            <tbody>
              {[
                { round: "Qualifiers", sr: "~7.2", format: "—", bans: "—" },
                { round: "RO32",       sr: "~6.8", format: "BO9",  bans: "1 Ban" },
                { round: "RO16",       sr: "~7.0", format: "BO9",  bans: "1 Ban" },
                { round: "Quarterfinals", sr: "~7.2", format: "BO11", bans: "2 Bans" },
                { round: "Semifinals", sr: "~7.4", format: "BO11", bans: "2 Bans" },
                { round: "Finals",     sr: "~7.7", format: "BO13", bans: "2 Bans" },
                { round: "Grand Finals", sr: "~8", format: "BO13", bans: "2 Bans" },
              ].map(({ round, sr, format, bans }) => (
                <tr key={round}>
                  <td style={{ paddingLeft: ".5vw", paddingBottom: "1vh", paddingRight: "3vw" }}>{round}</td>
                  <td style={{ paddingBottom: "1vh", paddingRight: "3vw" }}>{sr}</td>
                  <td style={{ paddingBottom: "1vh", paddingRight: "3vw" }}>{format}</td>
                  <td style={{ paddingBottom: "1vh" }}>{bans}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-qualifiers-procedures",
      label: "Qualifiers Procedures",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Qualifiers Procedures</h2>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>Qualifiers will be played to determine who qualifies (top 32 teams), in addition to team seeding.</li>
            <li>Qualifier lobbies will be held once screening gets back to us, depending on how long osu! Staff takes (usually 1-2 weeks).</li>
            <li>All teams are required to have at least <span style={{color: "#9FB878"}}>2 players present to their scheduled qualifier lobby</span> in order to be eligible to qualify. If the team has a 3rd player, they can sub in for the maps they’re playing for. No more than 2 players on a team can play at a time.</li>
            <li>Set times for qualifier lobbies will be shown on the Mainsheet, each team can only register for one lobby. If none of the preset times work, teams can create custom lobbies, make sure to check if your lobby was approved. Post your lobby sign ups in <span style={{color: "#9FB878"}}>#reschedule.</span></li>
            <li>In the event that a team missed their scheduled lobby, please choose a different lobby that works.</li>
            <li>Players will have <span style={{color: "#9FB878"}}>5 minutes</span> to join the lobby after the scheduled time. At that point the referee will start.</li>
            <li>If a player disconnects during the first 30 seconds of a map, that player <span style={{color: "#9FB878"}}>ONLY</span> will stay till the end of the lobby and replay the map.</li>
            <li>The top 32 teams from qualifiers will advance to the bracket stage. All other teams will be <span style={{color: "#9FB878"}}>eliminated.</span></li>
            <li>Seeding will be determined by the sum of percentiles assuming a normal curve (also known as Z-percentile).</li>
          </ul>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-bracket-stage",
      label: "Bracket Stage Procedures",
      size: "3vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Bracket Stage Procedures</h2>
        </>
      ),
    },
    {
      id: "rules-scheduling",
      label: "Scheduling",
      size: "2.3vh",
      marginBottom: "6vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", paddingLeft: "1vw", color: "#FFFCEA" }}>Scheduling</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>Matches will have a default schedule, which can be found on the main sheet.</li>
            <li>Matches can be rescheduled to no later than <span style={{color: "#9FB878"}}>Tuesday, 0:00 UTC.</span></li>
            <li>It is up to you to communicate with the other team to find a time that best works for both teams. If you’re unable to come up with a workable time, feel free to DM an admin for reschedules.</li>
            <li>No async matches will be allowed.</li>
            <li>If you agree to a reschedule, please have one of the team captains send a screenshot or a link to the match channel in <span style={{color: "#9FB878"}}>#reschedule.</span></li>
          </ul>
        </>
      ),
    },
    {
      id: "rules-match-procedures",
      label: "Match Procedures",
      size: "2.3vh",
      marginBottom: "6vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", paddingLeft: "1vw", color: "#FFFCEA" }}>Match Procedures</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li><span style={{color: "#9FB878"}}>NoFail and ScoreV2 will be required for all maps.</span></li>
            <li>Invites will be sent by the Referee to the team Captains, 5 minutes before the match start time.</li>
            <li>Match times are made prior to the start of the match. There is a 15 minute grace period after the start time for players to arrive. In the event that a team does not have enough players to continue, that team will forfeit.</li>
            <li>The Red Team MUST be in slots 1 and 2, and the Blue Team MUST be in slots 3 and 4.</li>
            <li>If a player disconnects within the first <span style={{color: "#9FB878"}}>30 seconds</span> of a map, the map will be aborted and replayed. However, if that player disconnects again, the map will continue with their score being counted where it was last visible.</li>
            <li>Aborts are granted once per team, per match.</li>
            <li>Teams may call for a <span style={{color: "#9FB878"}}>120 second</span> technical timeout once per match.</li>
            <li>The winner of a pick will be the team with the highest total score awarding a point.</li>
            <li>The match will conclude once a team reaches the total points required to win that stage.</li>
            <li>There will be a bracket reset in Grand Finals if required.</li>
          </ul>
        </>
      ),
    },
    {
      id: "rules-bans-and-picks",
      label: "Bans and Picks",
      size: "2.3vh",
      marginBottom: "6vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", paddingLeft: "1vw", color: "#FFFCEA" }}>Bans and Picks</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>Each team captain must !roll in the lobby chat. The highest roll will choose if their team <span style={{color: "#9FB878"}}>picks first and bans last or bans first and picks last</span> (ABAB).</li>
            <li>Each team will have <span style={{color: "#9FB878"}}>120 seconds</span> to ban a map. Once that time elapses, that team's ban will be skipped. If the bracket stage has 2+ bans, the ABAB format will be used.</li>
            <li>Banning maps from the same modpool is <span style={{color: "#9FB878"}}>not allowed</span>, except for NoMod. Likewise, consecutively picking maps from the same modpool is <span style={{color: "#9FB878"}}>allowed</span>. In other words, double banning is not allowed besides no NM, and double picking is allowed.</li>
            <li>The team that picks first will have <span style={{color: "#9FB878"}}>120 seconds</span> to pick a map. If a team fails to pick within that time, the pick will be given to the other team.</li>
            <li>Players will be given <span style={{color: "#9FB878"}}>120 seconds</span> to prepare once the map has been picked. Teams can swap out players during this time.</li>
          </ul>
        </>
      ),
    },
    {
      id: "rules-tiebreaker",
      label: "Tiebreaker",
      size: "2.3vh",
      marginBottom: "10vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", paddingLeft: "1vw", color: "#FFFCEA" }}>Tiebreaker</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "2.2vw",
              listStyleType: "disc",
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>If both teams are one point away from the required amount to win the round, the Tiebreaker map will be played.</li>
            <li><span style={{color: "#9FB878"}}>FreeMod</span> will be used for the TieBreaker. All players are allowed to use HD, HR, FL, EZ, or NoMod (including double mods ex. HDHR).</li>
            <li>All mod combinations are acceptable for all players. (ex. both players on a team can use HR)</li>
            <li><span style={{color: "#9FB878"}}>EZ</span> again will vary based on the map selected, and will be given a custom EZ multiplier.</li>
          </ul>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-schedule",
      label: "Schedule",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Schedule</h2>
          <table
            style={{
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
              width: "60vw",
            }}
          >
            <tbody>
              <tr>
                <td style={{ paddingLeft: ".5vw", paddingBottom: "2vh", fontWeight: "700"}}>Registration</td>
                <td style={{ paddingLeft: "3vw", paddingBottom: "2vh" }}>Feb 14 - Feb 28</td>
                <td style={{ paddingLeft: "10vw", paddingBottom: "2vh", fontWeight: "700" }}>Quarterfinals</td>
                <td style={{ paddingLeft: "0vw", paddingBottom: "2vh" }}>Apr 10 - Apr 13</td>
              </tr>
              <tr>
                <td style={{ paddingLeft: ".5vw", paddingBottom: "2vh", fontWeight: "700" }}>Screening</td>
                <td style={{ paddingLeft: "3vw", paddingBottom: "2vh" }}>Mar 1 - Mar 15</td>
                <td style={{ paddingLeft: "10vw", paddingBottom: "2vh", fontWeight: "700" }}>Semifinals</td>
                <td style={{ paddingLeft: "0vw", paddingBottom: "2vh" }}>Apr 17 - Apr 20</td>
              </tr>
              <tr>
                <td style={{ paddingLeft: ".5vw", paddingBottom: "2vh", fontWeight: "700" }}>Qualifiers</td>
                <td style={{ paddingLeft: "3vw", paddingBottom: "2vh" }}>Mar 20 - Mar 23</td>
                <td style={{ paddingLeft: "10vw", paddingBottom: "2vh", fontWeight: "700" }}>Finals</td>
                <td style={{ paddingLeft: "0vw", paddingBottom: "2vh" }}>Apr 24 - Apr 27</td>
              </tr>
              <tr>
                <td style={{ paddingLeft: ".5vw", paddingBottom: "2vh", fontWeight: "700" }}>Ro32</td>
                <td style={{ paddingLeft: "3vw", paddingBottom: "2vh" }}>Mar 27 - Mar 30</td>
                <td style={{ paddingLeft: "10vw", paddingBottom: "2vh", fontWeight: "700" }}>Grandfinals</td>
                <td style={{ paddingLeft: "0vw", paddingBottom: "2vh" }}>May 1 ~ (TBA)</td>
              </tr>
              <tr>
                <td style={{ paddingLeft: ".5vw", paddingBottom: "2vh", fontWeight: "700" }}>Ro16</td>
                <td style={{ paddingLeft: "3vw", paddingBottom: "2vh" }}>Apr 3 - Apr 6</td>
              </tr>
            </tbody>
          </table>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-prizes",
      label: "Prizes",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Prizes</h2>
          <ul
            style={{
              margin: 0,
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>Our amazing sponsors have contributed to our prize pool. The top three teams will have the option of selecting which products they’d like, giving first place winners priority and so forth. Additionally; if we have donations, that will be added to the prizepool.</li>
            <li style={{textIndent: "5vw"}}><span style={{color: "#9FB878"}}>First place team:</span> Sponsor products + Team animated banner + Badge (pending)</li>
            <li style={{textIndent: "5vw"}}><span style={{color: "#9FB878"}}>Second place team:</span> Sponsor products + Team animated banner</li>
            <li style={{textIndent: "5vw"}}><span style={{color: "#9FB878"}}>Third place team:</span> Sponsor products + Team animated banner</li>
            <li style={{textIndent: "5vw"}}><span style={{color: "#9FB878"}}>Tournament staff:</span> individual banner</li>
            <li style={{fontStyle: "italic"}}>We will be going for tri-badge as well</li>
          </ul>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-charity-donation",
      label: "Charity Donation",
      size: "2.3vh",
      marginBottom: "10vh",
      indent: "2vw",
      color: "#9FB878",
      content: (
        <>
          <h3 style={{ fontSize: "2.6vh", marginBottom: "1vh", color:"#FFFCEA"}}>Charity Donation</h3>
          <ul
            style={{
              margin: 0,
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>This tournament’s donation contributions are dedicated to members of the osu! community who are no longer with us. We are accepting donations in support of the American Foundation for Suicide Prevention (AFSP) to honor their memory and to extend care to those who continue to struggle.</li>
            <li>Behind every username are people who've spent time with us, shared moments of joy, growth, connection and pieces of our lives through this game. Some were close friends; and others were names we recognized, watched, or admired from afar, but all mattered just the same. They were more than just names on a leaderboard. Their presence shaped this community in ways both seen and unseen, and their absence continues to be felt by many.</li>
            <li>For so many players, osu! has been more than a rhythm game. It has been constant during difficult moments; a place of comfort and belonging when the rest of the world felt so distant; and a reminder that even in isolation, we are not alone. The connections formed, whether they were brief, long lasting, whether spoken or silently shared, it often meant more than words could ever express.</li>
            <li>AFSP works to save lives and to bring hope through research, education, advocacy, and support for individuals and families affected by suicide. A charity that has helped me personally and holds deep meaning to me.</li>
            <li>Every donation is a way to remember those we have lost, to honor the impact they had on us, and to help ensure that compassion and support remain present for those who are still here fighting; and still deserving of care. Thank you for taking this moment to remember and for supporting a cause that reflects the care, meaning, and the values this community holds deeply.</li>
          </ul>
          <div style={{ display: "flex", gap: "5vw", marginTop: "15vh", paddingLeft: "16vw"}}>
            <PaginationNext href="https://afsp.org/" label="LEARN MORE" aria-label="learn-more" />
            <PaginationNext href="https://ko-fi.com/lelastechcup" label="DONATE" aria-label="donate" />
          </div>
          <Separator />
        </>
      ),
    },
    {
      id: "rules-screening",
      label: "Screening",
      size: "3vh",
      marginBottom: "10vh",
      content: (
        <>
          <h2 style={{ fontSize: "3.5vh", marginBottom: "1.2vh" }}>Screening</h2>
          <ul
            style={{
              margin: 0,
              color: "#FFFCEA",
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "2.3vh",
              lineHeight: "3.5vh",
            }}
          >
            <li>Screening will be conducted by osu! staff.</li>
            <li>BWS will not be enforced.</li>
            <li>There will be no rank buffer.</li>
          </ul>
        </>
      ),
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        minHeight: "110vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/rules/bg.webp)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "100% auto",
            opacity: 0.7,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      <DesktopNavbar />
      <h1
        style={{
          position: "absolute",
          top: "19vh",
          left: "4vw",
          zIndex: 3,
          color: "#FFF7C2",
          fontFamily: "var(--font-sunlight-dreams)",
          fontSize: "4vw",
          margin: 0,
        }}
      >
        Rules & Prizes
      </h1>
      <nav
        style={{
          position: "fixed",
          top: "34vh",
          left: "1.3vw",
          width: "24vw",
          overflowY: "auto",
          padding: ".9vw",
          zIndex: 4,
          fontWeight: "400",
          color: "#FFF7C2",
          fontStyle: "normal",
          lineHeight: "100%",
          letterSpacing: "0%",
          fontFamily: "var(--font-sunlight-dreams)",
          whiteSpace: "nowrap",
        }}
        aria-label="Rules navigation"
      >
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: "3vh",
          }}
        >
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleNavClick}
                style={{
                  fontSize: item.size,
                  textDecoration: "none",
                  paddingLeft: item.indent || "0px",
                  color: item.color,
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "20vh",
          left: "calc(28vw)",
          color: "#FFF7C2",
          fontFamily: "var(--font-sunlight-dreams)",
        }}
      >
        {navItems.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            style={{ 
              marginBottom: item.marginBottom, 
              scrollMarginTop: "34vh", 
              whiteSpace: "normal",
              maxWidth: "68vw",
              overflowWrap: "anywhere",
            }}
          >
            {item.content}
          </section>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "-10vw",
          width: "120vw",
          height: "109%",
          backgroundColor: "#374426",
          border: ".6vh solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
      </div>
    </div>
  );
}
