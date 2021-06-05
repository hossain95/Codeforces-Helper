var han = document.getElementById("handle");
var form = document.getElementById("form1");
form.addEventListener("submit", (e) =>
{
    e.preventDefault();
    //reload
    $( "#output").load("index.html #output");
    //display
    //document.getElementById("upcommingcontest").style.display = "none";
    document.getElementById("singleUserOutput").style.display = "none";
    document.getElementById("twoUserOutput").style.display = "none";
    document.getElementById("standing1").style.display = "none";
    document.getElementById("standing2").style.display = "none";
    var handle = han.value;
    var val1 = handle;
    var val2 = val1;
    const userinfo = fetch(`https://codeforces.com/api/user.info?handles= ${handle}`);
    const status = fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const participate = fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    Promise.all([userinfo, status, participate]).then((values)=>
    {
        return Promise.all(values.map( r=> r.json()));
    }).then(([userinfo, status, participate]) =>
    {
        var result = userinfo.result[0];
        //console.log(result);
        var rating = result.rating;
        var maxRating = result.maxRating;
        var rank = result.rank;
        var maxRank = result.maxRank;
        var userName = result.firstName+ " "+ result.lastName;
        document.getElementById("name").innerText = userName;
        document.getElementById("rating").innerText = rating;
        document.getElementById("maxRating").innerText = maxRating;
        document.getElementById("rank").innerText = rank;
        document.getElementById("maxRank").innerText = maxRank;

        var ac = [];
        result = status.result;
        //console.log(result);
        for(i = 0; i < result.length; i++)
        {
            //console.log(result[i].verdict);
            if(result[i].verdict === "OK")
            {
                var id = result[i].contestId;
                
                var problem = id+result[i].problem.index;
                ac.push(problem);
            }
        }
        //console.log(ac);
        var accepted = [...new Set(ac)];

        //console.log(accepted.length);
        //console.log(result);
        var verdicted = [];
        var wa = [];
        for(i = 0; i < result.length; i++)
        {
            verdicted.push(result[i].verdict);
            var id = result[i].contestId;
            var problem = id+result[i].problem.index;
            wa.push(problem);
        }
        var total = [...new Set(wa)];
        //console.log(total.length);
        var solved = accepted.length;
        var trid = total.length;
        var unsolved = parseInt(trid)- parseInt(solved);

        result = participate.result;
        //console.log(result);
        var ratedContest = result.length;
        var bestRank = 1222222222222;
        var bestRankId = 0;
        var worstRank = 0;
        var worstRankId = 0;
        var up = -112234;
        var upId = 0;
        var down = 777777;
        var downId = 0;
        var ratingChange = [];
        var contestid = [];
        var time = [];
        //console.log(ratedContest+ " "+bestRank+" "+worstRank+" "+up + " "+down);
        for(i = 0; i < result.length; i++)
        {
            time.push(result[i].ratingUpdateTimeSeconds*1000);
            ratingChange.push(result[i].newRating);
            var a = result[i].newRating;
            contestid.push(result[i].contestId);
            var b = result[i].oldRating;
            if(i == 0 && result[i].contestId >= 1111)
            {
                b = 1400;
            }
            var d = a-b;
            if(up < d)
            {
                up = d;
                upId = result[i].contestId;
            }
            if(down > d)
            {
                down = d;
                downId = result[i].contestId;
            }
            down = Math.min(down, d);
            bestRank = Math.min(bestRank, result[i].rank);
            worstRank = Math.max(worstRank, result[i].rank);
        }
        document.getElementById("ratedContest").innerText = ratedContest;
        document.getElementById("bestRank").innerText = bestRank;
        document.getElementById("worstRank").innerText = worstRank;
        document.getElementById("maxUp").innerText = up;
        document.getElementById("maxDown").innerText = down;

        document.getElementById("solved").innerText = solved;
        document.getElementById("tried").innerText = trid;
        document.getElementById("unsolved").innerText = unsolved;




        var v = {};
        v["OK"] = 0;
        v["WRONG_ANSWER"] = 0;
        v["TIME_LIMIT_EXCEEDED"] = 0;
        v["RUNTIME_ERROR"] = 0;
        v["COMPILATION_ERROR"] = 0;
        v["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < verdicted.length; i++)
        {
            if(!v[verdicted[i]])
            {
                v[verdicted[i]] = 0;
            }
            v[verdicted[i]]++;
        }
        const dataStore = [];
        const labels = [];
        const backgroundColors = [];
        if(v.OK > 0)
        {
            dataStore.push(v.OK);
            labels.push("AC");
            backgroundColors.push("green");
        }
        if(v.WRONG_ANSWER > 0)
        {
            dataStore.push(v.WRONG_ANSWER);
            labels.push("WA");
            backgroundColors.push("red");
        }
        if(v.COMPILATION_ERROR > 0)
        {
            dataStore.push(v.COMPILATION_ERROR);
            labels.push("CPE");
            backgroundColors.push("pink");
        }
        if(v.TIME_LIMIT_EXCEEDED > 0)
        {
            dataStore.push(v.TIME_LIMIT_EXCEEDED);
            labels.push("TLE");
            backgroundColors.push("blue");
        }
        if(v.MEMORY_LIMIT_EXCEEDED > 0)
        {
            dataStore.push(v.MEMORY_LIMIT_EXCEEDED);
            labels.push("MLE");
            backgroundColors.push("navy");
        }

        //labels
        //dataStore
        function pieFunction()
        {
            const data =
            {
                labels: labels,
                datasets:
                [
                    {
                    
                        backgroundColor: backgroundColors,
                        data: dataStore,
                    }
                ]
            };

              const config =
              {
                type: 'pie',
                data,
                options:
                {
                    events: ['mousemove']
                }
            };
            var myChart = new Chart(
              document.getElementById('verdict'),
              config
            );
            
        }
        pieFunction();
        //document.getElementById("h1").innerText = "Verdicts of "+val2;


        var labelCount = {};
        labelCount["A"] = 0;
        labelCount["B"] = 0;
        labelCount["C"] = 0;
        labelCount["D"] = 0;
        labelCount["E"] = 0;
        labelCount["F"] = 0;
        labelCount["G"] = 0;
        labelCount["H"] = 0;
        labelCount["I"] = 0;
        labelCount["J"] = 0;
        labelCount["K"] = 0;
        for(i = 0; i < accepted.length; i++)
        {
            var x = accepted[i].charAt(accepted[i].length-1);
            if(!labelCount[x])
            {
                labelCount[x] = 0;
            }
            labelCount[x]++;
        }
        const labelData = [];
        const lablelabel = [];
        labelData.push(labelCount.A);
        lablelabel.push("A");
        labelData.push(labelCount.B);
        lablelabel.push("B");
        labelData.push(labelCount.C);
        lablelabel.push("C");
        labelData.push(labelCount.D);
        lablelabel.push("D");
        labelData.push(labelCount.E);
        lablelabel.push("E");
        labelData.push(labelCount.F);
        lablelabel.push("F");
        labelData.push(labelCount.G);
        lablelabel.push("G");
        labelData.push(labelCount.H);
        lablelabel.push("H");
        labelData.push(labelCount.I);
        lablelabel.push("I");
        labelData.push(labelCount.J);
        lablelabel.push("J");
        labelData.push(labelCount.K);
        lablelabel.push("K");

        console.log(labelCount);
        console.log(labelData);
        //console.log(labelData);
        function barFunction()
        {
            const data =
            {
                labels: lablelabel,
                datasets:
                [
                    {
                        data: labelData,
                        label: 'solved',
                        backgroundColor: '#3498db',
                        borderColor: '#3498db',
                        borderWidth: 1
                    }
                ]
            };
            const config =
            {
                type: 'bar',
                data: data,
                options:
                {
                  scales:
                  {
                    y:
                    {
                      beginAtZero: true
                    }
                  }
                },
              };
              var myChart = new Chart(
                document.getElementById('solvedByTag'),
                config
              );
        }
        barFunction();
        //document.getElementById("h2").innerText = "Labels of "+val2;


        var statusData = status.result;
        var allTag = {};
        var Count = {};
        for(i = 0; i < statusData.length; i++)
        {
            if(statusData[i].verdict == "OK")
            {
                var problemName = statusData[i].contestId+statusData[i].problem.index;

                //arr.push(result[i].problem.tags);
                if(!Count[problemName])
                {
                    var arr = statusData[i].problem.tags;
                    if(arr.length == 0)
                    {
                        continue;
                    }
                    for(j = 0; j < arr.length; j++)
                    {
                        if(!allTag[arr[j]])
                        {
                            allTag[arr[j]] = 0;
                        }
                        allTag[arr[j]]++;
                    }
                    Count[problemName] = 1;
                }
            }
        }
        //console.log(allTag);

        var Data = [];
        var tags = [];
        if(allTag["binary search"])
        {
            Data.push(allTag["binary search"]);
            tags.push("binary search");
        }
        if(allTag["bitmasks"])
        {
            Data.push(allTag["bitmasks"]);
            tags.push("bitmasks");
        }
        if(allTag["brute force"])
        {
            Data.push(allTag["brute force"]);
            tags.push("brute force");
        }
        if(allTag["chinese remainder theorem"])
        {
            Data.push(allTag["chinese remainder theorem"]);
            tags.push("chinese remainder theorem");
        }
        if(allTag["combinatorics"])
        {
            Data.push(allTag["combinatorics"]);
            tags.push("combinatorics");
        }
        if(allTag["constructive algorithms"])
        {
            Data.push(allTag["constructive algorithms"]);
            tags.push("constructive algorithms");
        }
        if(allTag["data structures"])
        {
            Data.push(allTag["data structures"]);
            tags.push("data structures");
        }
        if(allTag["dfs and similar"])
        {
            Data.push(allTag["dfs and similar"]);
            tags.push("dfs and similar");
        }
        if(allTag["divide and conquer"])
        {
            Data.push(allTag["divide and conquer"]);
            tags.push("divide and conquer");
        }
        if(allTag["dp"])
        {
            Data.push(allTag["dp"]);
            tags.push("dp");
        }
        if(allTag["dsu"])
        {
            Data.push(allTag["dsu"]);
            tags.push("dsu");
        }
        if(allTag["expression parsing"])
        {
            Data.push(allTag["expression parsing"]);
            tags.push("expression parsing");
        }
        if(allTag["flows"])
        {
            Data.push(allTag["flows"]);
            tags.push("flows");
        }
        if(allTag["games"])
        {
            Data.push(allTag["games"]);
            tags.push("games");
        }
        if(allTag["games"])
        {
            Data.push(allTag["games"]);
            tags.push("games");
        }
        if(allTag["graph matchings"])
        {
            Data.push(allTag["graph matchings"]);
            tags.push("graph matchings");
        }
        if(allTag["graphs"])
        {
            Data.push(allTag["graphs"]);
            tags.push("graphs");
        }if(allTag["greedy"])
        {
            Data.push(allTag["greedy"]);
            tags.push("greedy");
        }
        if(allTag["hashing"])
        {
            Data.push(allTag["hashing"]);
            tags.push("hashing");
        }
        if(allTag["implementation"])
        {
            Data.push(allTag["implementation"]);
            tags.push("implementation");
        }
        if(allTag["math"])
        {
            Data.push(allTag["math"]);
            tags.push("math");
        }
        if(allTag["matrices"])
        {
            Data.push(allTag["matrices"]);
            tags.push("matrices");
        }
        if(allTag["meet-in-the-middle"])
        {
            Data.push(allTag["meet-in-the-middle"]);
            tags.push("meet-in-the-middle");
        }
        if(allTag["number theory"])
        {
            Data.push(allTag["number theory"]);
            tags.push("number theory");
        }
        if(allTag["probabilities"])
        {
            Data.push(allTag["probabilities"]);
            tags.push("probabilities");
        }
        if(allTag["shortest paths"])
        {
            Data.push(allTag["shortest paths"]);
            tags.push("shortest paths");
        }
        if(allTag["sortings"])
        {
            Data.push(allTag["sortings"]);
            tags.push("sortings");
        }
        if(allTag["string suffix structures"])
        {
            Data.push(allTag["string suffix structures"]);
            tags.push("string suffix structures");
        }
        if(allTag["strings"])
        {
            Data.push(allTag["strings"]);
            tags.push("strings");
        }
        if(allTag["ternary search"])
        {
            Data.push(allTag["ternary search"]);
            tags.push("ternary search");
        }
        if(allTag["trees"])
        {
            Data.push(allTag["trees"]);
            tags.push("trees");
        }
        if(allTag["two pointers"])
        {
            Data.push(allTag["two pointers"]);
            tags.push("two pointers");
        }
        if(allTag["expression parsing"])
        {
            Data.push(allTag["expression parsing"]);
            tags.push("expression parsing");
        }
        if(allTag["fft"])
        {
            Data.push(allTag["fft"]);
            tags.push("fft");
        }
        if(allTag["interactive"])
        {
            Data.push(allTag["interactive"]);
            tags.push("interactive");
        }
        if(allTag["probabilities"])
        {
            Data.push(allTag["probabilities"]);
            tags.push("probabilities");
        }
        if(allTag["schedules"])
        {
            Data.push(allTag["schedules"]);
            tags.push("schedules");
        }

        function tagFunction()
        {
            const data = {
            labels: tags,
            datasets: [{
                data: Data,
                label: 'tags',
                backgroundColor: '#3498db',
                borderColor: '#3498db',
                borderWidth: 2
            }]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                },
              };
              var myChart = new Chart(
                document.getElementById('solvedByTag2'),
                config
              );
        }
        tagFunction();
        
        //document.getElementById("h3").innerText = "Solved Problem by tag of "+val2;


        //document.getElementById("upcommingcontest").style.display = "none";
        document.getElementById("singleUserOutput").style.display = "";
        document.getElementById("twoUserOutput").style.display = "none";
        document.getElementById("standing1").style.display = "none";
        document.getElementById("standing2").style.display = "none";

    }).catch((ee)=>
    {
        console.log(ee);
        //document.getElementById("error").innerText="Something is worng please reload...";
    });
});