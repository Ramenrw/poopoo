# How to run
## With Visual Studio
Click the "Run" button or press F5 to start the application.

## With .NET CLI (command prompt)
1. Open a command prompt or terminal.
2. Navigate to the project directory.
3. Run the following command to build and run the application:
   ```
   dotnet run
   ```
4. The application will start, and you can interact with it through the console.

# Summary
This is the backend project.  The frontend project will call exactly one route in this project to get data.
When running locally, the route will be `https://localhost:7134/analyze`.
For the body, follow the schema inside AnalyzeRequest.cs.

For the response, follow the schema inside AnalyzeResponse.cs.

It will be in JSON format.

For example,
```javascript
fetch('https://localhost:7134/analyze', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		"image": "base64encodedimage",
		"userNotes": "im allergic to peanuts",
	})
}).then((res) => {
	return res.json();
}).then((data) => {
	console.log(data);
});
```

The response could look something like this:

(for reference, the dto looks like this)
```csharp
public record AnalyzeResponse(
        string[] DetectedItems, // items model was able to detect
        string[] UnsureItems, // items model was unsure about
        string[] MealIdeas, // the ideas
        string? Disclaimer = null, // disclaimer about accuracy
        string[]? Questions = null // for the user to answer.
    );
```
(the json response the frontend will use)
```json
{
	"detectedItems": ["apple", "banana", "carrot"],
	"unsureItems": ["mango"],
	"mealIdeas": [
		"Fruit Salad with Apple, Banana, and Carrot",
		"Smoothie with Apple and Banana"
	],
	"disclaimer": "This analysis is based on image recognition and may not be 100% accurate.",
	"questions": [
		"Do you have any dietary restrictions?",
		"Are you allergic to any foods?"
	]
}
```
