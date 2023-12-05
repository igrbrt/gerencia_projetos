FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
#RUN mvn package
COPY target/projects-0.0.1-SNAPSHOT.jar projeto.jar
ENTRYPOINT ["java","-jar","/projeto.jar"]