document.getElementById("form2").addEventListener("submit", (e)=>
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



    var han1 = document.getElementById("handle1").value;
    var han2 = document.getElementById("handle2").value;
    const userinfo1 = fetch(`https://codeforces.com/api/user.info?handles=${han1};${han2}`);
    const status1 = fetch(`https://codeforces.com/api/user.status?handle=${han1}`);
    const status2 = fetch(`https://codeforces.com/api/user.status?handle=${han2}`);
    const participate1 = fetch(`https://codeforces.com/api/user.rating?handle=${han1}`);
    const participate2 = fetch(`https://codeforces.com/api/user.rating?handle=${han2}`);
    Promise.all([userinfo1, status1, status2, participate1, participate2]).then((values)=>
    {
        return Promise.all(values.map(r=>r.json()));
    }).then(([userinfo1, status1, status2, participate1, participate2]) =>
    {
        var user1 = userinfo1.result[0];
        var user2 = userinfo1.result[1];
        console.log(user1);
        console.log(user2);
        //first table
        document.getElementById("user1").innerText = han1;
        document.getElementById("user2").innerText = han2;
        document.getElementById("name1").innerText = user1.firstName+" "+user1.lastName;
        document.getElementById("name2").innerText = user2.firstName+" "+user2.lastName;
        document.getElementById("rating1").innerText = user1.rating;
        document.getElementById("rating2").innerText = user2.rating;
        document.getElementById("maxRating1").innerText = user1.maxRating;
        document.getElementById("maxRating2").innerText = user2.maxRating;
        document.getElementById("rank1").innerText = user1.rank;
        document.getElementById("rank2").innerText = user2.rank;
        document.getElementById("maxRank1").innerText = user1.maxRank;
        document.getElementById("maxRank2").innerText = user2.maxRank;


        document.getElementById("user12").innerText = han1;
        document.getElementById("user22").innerText = han2;
        document.getElementById("ratedContest1").innerText = participate1.result.length;
        document.getElementById("ratedContest2").innerText = participate2.result.length;
        var Bestrank = 10000000000000;
        var Worstrank = 0;
        var arr = [];
        var Maxdown = 0;
        var Maxup = 0;
        for(i = 0; i < participate1.result.length; i++)
        {
            Bestrank = Math.min(Bestrank, participate1.result[i].rank);
            Worstrank = Math.max(Worstrank, participate1.result[i].rank);
            var a = participate1.result[i].newRating;
            var b = participate1.result[i].oldRating;
            if(i == 0)
            {
                
                if(participate1.result[i].contestId < 1360)
                {
                    console.log("yes");
                    b = 1500;
                }
                else
                {
                    b = 100;
                }
            }
            var d = a-b;
            arr.push(d);
        }
        arr.sort(function(a, b){return a-b});
        console.log(arr);
        if(arr.length !== 0)
        {
            Maxdown = arr[0];
            Maxup = arr[arr.length-1];
        }
        var Bestrank2 = 10000000000000;
        var Worstrank2 = 0;
        var arr2 = [];
        var Maxdown2 = 0;
        var Maxup2 = 0;
        for(i = 0; i < participate2.result.length; i++)
        {
            Bestrank2 = Math.min(Bestrank2, participate2.result[i].rank);
            Worstrank2 = Math.max(Worstrank2, participate2.result[i].rank);
            var a = participate2.result[i].newRating;
            var b = participate2.result[i].oldRating;
            if(i == 0)
            {
                
                if(participate2.result[i].contestId < 1360)
                {
                    console.log("yes");
                    b = 1500;
                }
                else
                {
                    b = 100;
                }
            }
            var d = a-b;
            arr2.push(d);
        }
        arr2.sort(function(a, b){return a-b});
        console.log(arr2);
        if(arr2.length !== 0)
        {
            Maxdown2 = arr2[0];
            Maxup2 = arr2[arr2.length-1];
        }
        document.getElementById("bestRank1").innerText = Bestrank;
        document.getElementById("bestRank2").innerText = Bestrank2;
        document.getElementById("worstRank1").innerText = Worstrank;
        document.getElementById("worstRank2").innerText = Worstrank2;

        document.getElementById("maxUp1").innerText = Maxup;
        document.getElementById("maxUp2").innerText = Maxup2;

        document.getElementById("maxDown1").innerText = Maxdown;
        document.getElementById("maxDown2").innerText = Maxdown2;




        var tried = [];
        var sovled = [];
        for(i = 0; i < status1.result.length; i++)
        {
            var problem = status1.result[i].contestId+status1.result[i].problem.index;
            tried.push(problem);
            if(status1.result[i].verdict === "OK")
            {
                //console.log(problem);
                sovled.push(problem);
            }
        }
        var uniqueTried = [...new Set(tried)];
        var uniqueSolved = [...new Set(sovled)];
        var Unsolved = uniqueTried.length-uniqueSolved.length;
        var data1 = [];
        data1.push(uniqueTried.length);
        data1.push(uniqueSolved.length);
        data1.push(Unsolved);

        console.log(tried);
        var tried2 = [];
        var sovled2 = [];
        for(i = 0; i < status2.result.length; i++)
        {
            var problem = status2.result[i].contestId+status2.result[i].problem.index;
            tried2.push(problem);
            if(status2.result[i].verdict == "OK")
            {
                sovled2.push(problem);
            }
        }
        var uniqueTried2 = [...new Set(tried2)];
        var uniqueSolved2 = [...new Set(sovled2)];
        var Unsolved2 = uniqueTried2.length-uniqueSolved2.length;
        var data2 = [];
        data2.push(uniqueTried2.length);
        data2.push(uniqueSolved2.length);
        data2.push(Unsolved);
        var label1 = [];
        label1.push("tried");
        label1.push("solved");
        label1.push("unsolved");
        console.log(data1);
        console.log(data2);
        console.log(label1);
        console.log(data1);
        console.log(data2);
        function trySolvedFunction()
        {
            const data =
            {
                labels: label1,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data: data1,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: data2,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                    options:
                    {
                        y:
                        {
                            beginAtZero: true
                        }
                    }
                };
            var myChart = new Chart(
              document.getElementById('triedSolvedUnsolved'),
              config
            ); 
        }
        trySolvedFunction();



        var v = {};
        v["OK"] = 0;
        v["WRONG_ANSWER"] = 0;
        v["TIME_LIMIT_EXCEEDED"] = 0;
        v["RUNTIME_ERROR"] = 0;
        v["COMPILATION_ERROR"] = 0;
        v["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < status1.result.length; i++)
        {
            if(!v[status1.result[i].verdict])
            {
                v[status1.result[i].verdict] = 0;
            }
            v[status1.result[i].verdict]++;
        }

        const data3 = [];
        const label2 = [];
        const backgroundColors3 = [];
        if(v.OK > 0)
        {
            data3.push(v.OK);
            label2.push("AC");
            backgroundColors3.push("green");
        }
        else
        {
            data3.push(0);
            label2.push("AC");
            backgroundColors3.push("green");
        }
        if(v.WRONG_ANSWER > 0)
        {
            data3.push(v.WRONG_ANSWER);
            label2.push("WA");
            backgroundColors3.push("red");
        }
        else
        {
            data3.push(0);
            label2.push("WA");
            backgroundColors3.push("red");
        }
        if(v.COMPILATION_ERROR > 0)
        {
            data3.push(v.COMPILATION_ERROR);
            label2.push("CPE");
            backgroundColors3.push("pink");
        }
        else
        {
            data3.push(0);
            label2.push("CPE");
            backgroundColors3.push("pink");
        }
        if(v.TIME_LIMIT_EXCEEDED > 0)
        {
            data3.push(v.TIME_LIMIT_EXCEEDED);
            label2.push("TLE");
            backgroundColors3.push("blue");
        }
        else
        {
            data3.push(0);
            label2.push("TLE");
            backgroundColors3.push("blue");
        }
        if(v.MEMORY_LIMIT_EXCEEDED > 0)
        {
            data3.push(v.MEMORY_LIMIT_EXCEEDED);
            label2.push("MLE");
            backgroundColors3.push("navy");
        }
        else
        {
            data3.push(0);
            label2.push("MLE");
            backgroundColors3.push("navy");
        }

        var v2 = {};
        v2["OK"] = 0;
        v2["WRONG_ANSWER"] = 0;
        v2["TIME_LIMIT_EXCEEDED"] = 0;
        v2["RUNTIME_ERROR"] = 0;
        v2["COMPILATION_ERROR"] = 0;
        v2["MEMORY_LIMIT_EXCEEDED"] = 0;
        for(i = 0; i < status2.result.length; i++)
        {
            if(!v2[status2.result[i].verdict])
            {
                v2[status2.result[i].verdict] = 0;
            }
            v2[status2.result[i].verdict]++;
        }

        const data4 = [];
        const label3 = [];
        const backgroundColors4 = [];
        if(v2.OK > 0)
        {
            data4.push(v2.OK);
            label3.push("AC");
            backgroundColors4.push("green");
        }
        else
        {
            data4.push(0);
            label3.push("AC");
            backgroundColors4.push("green");
        }
        if(v2.WRONG_ANSWER > 0)
        {
            data4.push(v2.WRONG_ANSWER);
            label3.push("WA");
            backgroundColors4.push("red");
        }
        else
        {
            data4.push(0);
            label3.push("WA");
            backgroundColors4.push("red");
        }
        if(v2.COMPILATION_ERROR > 0)
        {
            data4.push(v2.COMPILATION_ERROR);
            label3.push("CPE");
            backgroundColors4.push("pink");
        }
        else
        {
            data4.push(v2.COMPILATION_ERROR);
            label3.push("CPE");
            backgroundColors4.push("pink");
        }
        if(v2.TIME_LIMIT_EXCEEDED > 0)
        {
            data4.push(v2.TIME_LIMIT_EXCEEDED);
            label3.push("TLE");
            backgroundColors4.push("blue");
        }
        if(v2.MEMORY_LIMIT_EXCEEDED > 0)
        {
            data4.push(v2.MEMORY_LIMIT_EXCEEDED);
            label3.push("MLE");
            backgroundColors4.push("navy");
        }
        else
        {
            data4.push(0);
            label3.push("MLE");
            backgroundColors4.push("navy");
        }


        function verdicteSolvedFunction()
        {
            const data =
            {
                labels: label2,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data:  data3,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: data4,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                    options:
                    {
                        y:
                        {
                            beginAtZero: true
                        }
                    }
                };
            var myChart = new Chart(
              document.getElementById('twoUserVerdict'),
              config
            ); 
        }
        verdicteSolvedFunction();
        //document.getElementById("h2").innerText = "Verdicted";

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
        for(i = 0; i < uniqueSolved.length; i++)
        {
            var x = uniqueSolved[i].charAt(uniqueSolved[i].length-1);
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
        labelData.push(labelCount.K);2
        lablelabel.push("K");

        var labelCount2 = {};
        labelCount2["A"] = 0;
        labelCount2["B"] = 0;
        labelCount2["C"] = 0;
        labelCount2["D"] = 0;
        labelCount2["E"] = 0;
        labelCount2["F"] = 0;
        labelCount2["G"] = 0;
        labelCount2["H"] = 0;
        labelCount2["I"] = 0;
        labelCount2["J"] = 0;
        labelCount2["K"] = 0;
        for(i = 0; i < uniqueSolved2.length; i++)
        {
            var x = uniqueSolved2[i].charAt(uniqueSolved2[i].length-1);
            if(!labelCount2[x])
            {
                labelCount2[x] = 0;
            }
            labelCount2[x]++;
        }
        const labelData2 = [];
        const lablelabel2 = [];
        labelData2.push(labelCount2.A);
        lablelabel2.push("A");
        labelData2.push(labelCount2.B);
        lablelabel2.push("B");
        labelData2.push(labelCount2.C);
        lablelabel2.push("C");
        labelData2.push(labelCount2.D);
        lablelabel2.push("D");
        labelData2.push(labelCount2.E);
        lablelabel2.push("E");
        labelData2.push(labelCount2.F);
        lablelabel2.push("F");
        labelData2.push(labelCount2.G);
        lablelabel2.push("G");
        labelData2.push(labelCount2.H);
        lablelabel2.push("H");
        labelData2.push(labelCount2.I);
        lablelabel2.push("I");
        labelData2.push(labelCount2.J);
        lablelabel2.push("J");
        labelData2.push(labelCount2.K);
        lablelabel2.push("K");

        console.log(labelData);
        console.log(labelData2);
        function lavelSolvedFunction()
        {
            const data =
            {
                labels: lablelabel,
                datasets:
                [
                    {
                        label: han1,
                        backgroundColor: '#0984e3',
                        data: labelData,
                    },
                    {
                        label: han2,
                        backgroundColor: '#6c5ce7',
                        data: labelData2,
                    }
                ]
            };
              const config =
              {
                    type: 'bar',
                    data,
                };
            var myChart = new Chart(
              document.getElementById('twoUserSolvedByLabel'),
              config
            ); 
        }
        lavelSolvedFunction()

        //display
        //document.getElementById("upcommingcontest").style.display = "none";
        document.getElementById("singleUserOutput").style.display = "none";
        document.getElementById("twoUserOutput").style.display = "";
        document.getElementById("standing1").style.display = "none";
        document.getElementById("standing2").style.display = "none";

    }).catch((ee)=>
    {
        console.log(ee);
        //document.getElementById("error").innerText="Something is worng please reload...";
    });
});