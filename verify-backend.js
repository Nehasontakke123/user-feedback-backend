// Bun has native fetch, so we don't need to import it
const BASE_URL = "http://localhost:5001";
async function runTest() {
    console.log("🚀 Starting System Verification...");
    try {
        // 1. Create User (MySQL)
        console.log("\n1️⃣  Creating User (MySQL)...");
        const userRes = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Postman Test User", email: `test${Date.now()}@example.com` }),
        });
        if (!userRes.ok)
            throw new Error(`Create User failed: ${userRes.statusText}`);
        const user = await userRes.json();
        console.log("✅ User Created:", user);
        // 2. Create Form (MySQL)
        console.log("\n2️⃣  Creating Form (MySQL)...");
        const formRes = await fetch(`${BASE_URL}/forms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "Test Form",
                description: "Form for testing submissions",
                createdBy: user.id
            }),
        });
        if (!formRes.ok)
            throw new Error(`Create Form failed: ${formRes.statusText}`);
        const form = await formRes.json();
        console.log("✅ Form Created:", form);
        // 3. Create Submission (MongoDB)
        console.log("\n3️⃣  Creating Submission (MongoDB)...");
        const submissionRes = await fetch(`${BASE_URL}/submissions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                formId: form.id,
                answers: { question1: "Answer 1", rating: 5, feedback: "Excellent!" }
            }),
        });
        if (!submissionRes.ok)
            throw new Error(`Create Submission failed: ${submissionRes.statusText}`);
        const submission = await submissionRes.json();
        console.log("✅ Submission Created:", submission);
        // 4. Verify User List (MySQL)
        console.log("\n4️⃣  Verifying Users List (MySQL)...");
        const usersListRes = await fetch(`${BASE_URL}/users`);
        if (!usersListRes.ok) {
            console.log("⚠️  Could not fetch users list (Check if GET /users route exists)");
        }
        else {
            const usersList = await usersListRes.json();
            console.log(`✅ Users found: ${usersList.length}`);
            const found = usersList.find((u) => u.id === user.id);
            if (found)
                console.log("✅ Created user confirmed in list.");
        }
        // 5. Verify Submissions List (MongoDB)
        console.log("\n5️⃣  Verifying Submissions List (MongoDB)...");
        const subListRes = await fetch(`${BASE_URL}/submissions?formId=${form.id}`);
        if (!subListRes.ok)
            throw new Error("Fetch submissions failed");
        const subData = await subListRes.json();
        console.log(`✅ Submissions found for form ${form.id}:`, subData.submissions.length);
        console.log("✅ Submission Data:", JSON.stringify(subData.submissions[0], null, 2));
        console.log("\n✨ Verification Complete! System is working correctly.");
    }
    catch (error) {
        console.error("\n❌ Verification Failed:", error);
    }
}
runTest();
