# -------- BUILD STAGE --------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY poopoo_backend.csproj ./
RUN dotnet restore poopoo_backend.csproj

# Copy everything else and publish
COPY . .
RUN dotnet publish poopoo_backend.csproj -c Release -o /app/publish

# -------- RUNTIME STAGE --------
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "poopoo_backend.dll"]
