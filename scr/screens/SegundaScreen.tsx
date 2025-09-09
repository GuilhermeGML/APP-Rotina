import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RootStackParamList = {
  Home: undefined;
  Segunda: undefined;
  Terceira: undefined;
};

type Project = {
  name: string;
  description: string;
  time: string;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Segunda"
>;

export default function SegundaScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [doneProjects, setDoneProjects] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const hoje = new Date();
  const dataFormatada = `${hoje.getDate().toString().padStart(2, "0")}/${
    (hoje.getMonth() + 1).toString().padStart(2, "0")
  }/${hoje.getFullYear()}`;

  // 🔹 Carregar projetos salvos
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const savedProjects = await AsyncStorage.getItem("projects");
        const savedDoneProjects = await AsyncStorage.getItem("doneProjects");

        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedDoneProjects) setDoneProjects(JSON.parse(savedDoneProjects));
      } catch (error) {
        console.log("Erro ao carregar projetos:", error);
      }
    };
    loadProjects();
  }, []);

  // 🔹 Salvar no AsyncStorage sempre que mudar
  useEffect(() => {
    const saveProjects = async () => {
      try {
        await AsyncStorage.setItem("projects", JSON.stringify(projects));
        await AsyncStorage.setItem("doneProjects", JSON.stringify(doneProjects));
      } catch (error) {
        console.log("Erro ao salvar projetos:", error);
      }
    };
    saveProjects();
  }, [projects, doneProjects]);

  const addProject = () => {
    if (name.trim() && description.trim() && time.trim()) {
      setProjects([...projects, { name, description, time }]);
      setName("");
      setDescription("");
      setTime("");
    }
  };

  const completeProject = (index: number) => {
    const project = projects[index];
    setDoneProjects([...doneProjects, project]);
    setProjects(projects.filter((_, i) => i !== index));
  };

  const deleteProject = (index: number, isDone = false) => {
    if (isDone) {
      setDoneProjects(doneProjects.filter((_, i) => i !== index));
    } else {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  return (
    <LinearGradient colors={["#4B0082", "#000000"]} style={styles.container}>
      <Text style={styles.date}>📂 Meus Projetos - {dataFormatada}</Text>

      {/* Inputs para Nome, Descrição e Tempo */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Projeto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Tempo (ex: 3h, 2 dias)"
          value={time}
          onChangeText={setTime}
        />
        <View style={{ width: "40%", alignSelf: "center" }}>
          <Button title="+" onPress={addProject} />
        </View>
      </View>

      {/* 🔹 Duas colunas: Em andamento | Concluídos */}
      <View style={styles.taskColumns}>
        {/* Projetos em andamento */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>🚀 Em andamento</Text>
          <FlatList
            data={projects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskText}>{item.name}</Text>
                  <Text style={styles.subText}>{item.description}</Text>
                  <Text style={styles.subText}>⏳ {item.time}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => completeProject(index)}
                  style={styles.completeButton}
                >
                  <Text style={styles.completeText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProject(index)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Projetos concluídos */}
        <View style={styles.taskColumn}>
          <Text style={styles.columnTitle}>🎉 Concluídos</Text>
          <FlatList
            data={doneProjects}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.taskItem}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.taskText,
                      { textDecorationLine: "line-through", color: "lightgreen" },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.subText}>{item.description}</Text>
                  <Text style={styles.subText}>⏳ {item.time}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteProject(index, true)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>

      {/* Navegação */}
      <View style={styles.navButtons}>
        <Button title="🏠 Voltar Home" onPress={() => navigation.navigate("Home")} />
        <Button title="➡️ Ir para Terceira" onPress={() => navigation.navigate("Terceira")} />
      </View>
    </LinearGradient>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white", 
    width: '40%',
    alignSelf: 'center',
  },
  taskColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  taskColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#ddd",
  },
  completeButton: {
    marginRight: 10,
  },
  completeText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
  navButtons: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
