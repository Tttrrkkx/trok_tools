(async () => {
    const getModules = () => webpackChunkdiscord_app.push([
        [Symbol()], {},
        m => m
    ])?.c ?? {}
    const findModule = find => Object.values(getModules()).map(x => x?.exports?.default ?? x?.exports).filter(Boolean).find(find)
    const token = findModule(m => typeof m?.getToken === "function" && typeof m.getToken() === "string")?.getToken();
    const superProperties = findModule(m => typeof m?.getSuperPropertiesBase64 === "function" && typeof m.getSuperPropertiesBase64() === "string")
        ?.getSuperPropertiesBase64();
    setInterval(async () => {
        const before = await fetch("https://discord.com/api/v9/gorilla/activity/gathering/start", {
            "headers": {
                "authorization": token,
                "x-super-properties": superProperties,
                "content-type": "application/json",
            },
            "body": null,
            "method": "POST",
            "credentials": "include"
        }).then(e => e.json()).then(e => e);
        const after = await fetch("https://discord.com/api/v9/gorilla/activity/gathering/complete", {
            "headers": {
                "authorization": token,
                "x-super-properties": superProperties,
                "content-type": "application/json",
            },
            "body": null,
            "method": "POST",
            "credentials": "include"
        }).then(e => e.json()).then(e => e);
        const beforeText = `Before: ${before?.user_data?.level} (${before?.user_data?.xp})`
        const afterText = `After: ${after?.user_data?.level} (${after?.user_data?.xp})`
        const isAllZero = after?.user_data?.xp === 0 && before?.user_data?.xp === 0;
        if (isAllZero) {
            await fetch("https://discord.com/api/v9/gorilla/user-data/@me", {
                "headers": {
                    "authorization": token,
                    "x-super-properties": superProperties,
                    "content-type": "application/json",
                },
                "body": null,
                "method": "GET",
                "credentials": "include"
            }).then(e => console.log("Loaded User data")).then(e => {
                console.log("Fetched user data due to zero XP:", e);
            });
            await fetch("https://discord.com/api/v9/gorilla/user-data/@me", {
                "headers": {
                    "authorization": token,
                    "x-super-properties": superProperties,
                    "content-type": "application/json",
                },
                "body": JSON.stringify({
                    "crafting_class": "armor_crafter",
                    "combat_class": "healer"
                }),
                "method": "POST",
                "credentials": "include"
            }).then(e => console.log("Set crafting and combat class")).then(e => {
                console.log("Set class Successfully")
            });
        }
        console.log(beforeText, afterText)
    }, 1250);
})()
