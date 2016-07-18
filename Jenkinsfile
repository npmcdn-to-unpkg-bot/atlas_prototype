#!groovy

node {

    String BRANCH = "${env.BRANCH_NAME}"
    String INVENTORY = (BRANCH == "master" ? "production" : "acceptance")

    try {

    stage "Checkout"
        checkout scm

    stage "Test"

        try {
            sh "docker-compose build --no-cache"
            sh "docker-compose up -d"
            sh "docker-compose run -u root atlas npm test"

        }
        finally {
            sh "docker-compose stop"
            sh "docker-compose rm -f"
        }

    stage "Build"

        def image = docker.build("admin.datapunt.amsterdam.nl:5000/atlas/client:${BRANCH}")
        image.push()

        if (BRANCH == "master") {
            image.push("latest")
        }

    stage "Deploy"

        build job: 'Subtask_Openstack_Playbook',
                parameters: [
                        [$class: 'StringParameterValue', name: 'INVENTORY', value: INVENTORY],
                        [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy-atlas-client.yml'],
                        [$class: 'StringParameterValue', name: 'BRANCH', value: BRANCH],
                ]
}
    catch (err) {
        slackSend message: "Problem while building Atlas Prototype service: ${err}",
                channel: '#ci-channel'

        throw err
    }
}
